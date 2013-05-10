/*! angular-leaflet-directive 04-05-2013 */
$app.directive("leaflet", function () {
    return {
        restrict: "E",
        replace: !0,
        transclude: !0,
        scope: {
            center: "=center",
            marker: "=marker",
            message: "=message",
            zoom: "=zoom",
            maxZoom: "=maxzoom",
            minZoom: "=minzoom",
            tilelayer: "=tilelayer",
            multiMarkers: "=multimarkers",
            mainPath: "=mainpath"
        },
        template: '<div class="angular-leaflet-map"></div>',
        link: function (t, e, n) {
            var a = e[0],
                r = new L.Map(a),
                o = t.tilelayer || "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            L.tileLayer(o, {
                maxZoom: ((!_.isUndefined(t.maxZoom))?t.maxZoom:12),
                minZoom: ((!_.isUndefined(t.minZoom))?t.minZoom:12)
            }).addTo(r);
            var g = new L.LatLng(40.094882122321145, -3.8232421874999996);
            if (r.setView(g, 5), t.$watch("center", function (e) {
                if (void 0 !== e) {
                    e = new L.LatLng(t.center.lat, t.center.lng);
                    var a = t.zoom || 8;
                    r.setView(e, a);
                    var o = new L.marker(t.center, {
                        draggable: n.markcenter ? !1 : !0
                    });
                    (n.markcenter || n.marker) && (r.addLayer(o), n.marker && (t.marker.lat = o.getLatLng().lat, t.marker.lng = o.getLatLng().lng), t.$watch("message", function (t) {
                        o.bindPopup("<strong>" + t + "</strong>", {
                            closeButton: !1
                        }), o.openPopup()
                    }));
                    var g = !1;
                    if (r.on("dragstart", function () {
                        g = !0
                    }), r.on("drag", function () {
                        t.$apply(function (t) {
                            t.center.lat = r.getCenter().lat, t.center.lng = r.getCenter().lng
                        })
                    }), r.on("dragend", function () {
                        g = !1
                    }), t.$watch("center.lng", function (t) {
                        g || r.setView(new L.LatLng(r.getCenter().lat, t), r.getZoom())
                    }), t.$watch("center.lat", function (t) {
                        g || r.setView(new L.LatLng(t, r.getCenter().lng), r.getZoom())
                    }), t.$watch("zoom", function (t) {
                        r.setZoom(t)
                    }), r.on("zoomend", function () {
                        void 0 !== t.zoom && t.$apply(function (t) {
                            t.zoom = r.getZoom()
                        })
                    }), n.marker) {
                        var l = !1;
                        (function () {
                            o.on("dragstart", function () {
                                l = !0
                            }), o.on("drag", function () {
                                t.$apply(function (t) {
                                    t.marker.lat = o.getLatLng().lat, t.marker.lng = o.getLatLng().lng
                                })
                            }), o.on("dragend", function () {
                                o.openPopup(), l = !1
                            }), r.on("click", function (e) {
                                o.setLatLng(e.latlng), o.openPopup(), t.$apply(function (t) {
                                    t.marker.lat = o.getLatLng().lat, t.marker.lng = o.getLatLng().lng
                                })
                            }), t.$watch("marker.lng", function (t) {
                                l || o.setLatLng(new L.LatLng(o.getLatLng().lat, t))
                            }), t.$watch("marker.lat", function (t) {
                                l || o.setLatLng(new L.LatLng(t, o.getLatLng().lng))
                            })
                        })()
                    }
                }
            }), n.multimarkers) {
                var l = [],
                    i = function (t, e) {
                        var n = e.multiMarkers[t],
                            a = new L.marker(e.multiMarkers[t], {
                                draggable: n.draggable ? !0 : !1
                            });
                        return a.on("dragstart", function () {
                            dragging_marker = !0
                        }), a.on("drag", function () {
                            e.$apply(function () {
                                n.lat = a.getLatLng().lat, n.lng = a.getLatLng().lng
                            })
                        }), a.on("dragend", function () {
                            dragging_marker = !1
                        }), n.message && a.on("click", function () {
                            a.bindPopup("" + n.message, {
                                closeButton: !0
                            }), a.openPopup()
                        }), e.$watch("multiMarkers." + t, function () {
                            a.setLatLng(e.multiMarkers[t])
                        }, !0), a
                    };
                t.$watch("multiMarkers", function () {
                    for (var e in l) t.multiMarkers[e] || r.removeLayer(l[e]);
                    for (var n in t.multiMarkers) if (!l[n]) {
                            var a = i(n, t);
                            r.addLayer(a), l[n] = a
                        }
                }, !0)
            }
            if (n.mainpath) {
                var c = new L.Polyline([], {});
                r.addLayer(c), t.$watch("mainPath", function () {
                    c.setLatLngs(t.mainPath.latlngs), c.setStyle({
                        smoothFactor: t.mainPath.smoothFactor,
                        color: t.mainPath.color
                    })
                }, !0)
            }
        }
    }
});