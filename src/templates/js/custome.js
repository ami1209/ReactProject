//New design
$(function() {
    $(document).ready(function() {
        //$("#fix_to_top_div").sticky({ topSpacing: 0 });
        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.home_mobile').css('min-height', windowHeight);
        };
        setHeight();

        $(window).resize(function() {
            setHeight();
            //$("#fix_to_top_div").sticky({ topSpacing: 0 });
        });
    });
    $(document).ready(function() {
        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.cashier').css('min-height', windowHeight);
        };
        setHeight();

        $(window).resize(function() {
            setHeight();
        });
    });
    $(document).ready(function() {
        function setHeight() {
            windowHeight = $(window).innerHeight();
            $('.popup_content').css('max-height', windowHeight - "40");
        };
        setHeight();

        $(window).resize(function() {
            setHeight();
        });
    });

    $(".more_bonus").click(
        function() {
            $("#more_bonus").fadeIn('slow');
        }
    );

    $(".remove_card").click(
        function() {
            $("#remove_card").fadeIn('slow');
        }
    );

    $(".failed_transaction").click(
        function() {
            $("#failed_transaction").fadeIn('slow');
        }
    );

    $(".failed_transaction1").click(
        function() {
            $("#failed_transaction1").fadeIn('slow');
        }
    );

    $(".close_btn, .backdrop_popup").click(
        function() {
            $("#more_bonus, #remove_card, #failed_transaction, #failed_transaction1").fadeOut('fast');
        }
    );

});

var bookmarkscroll, $ = jQuery.noConflict();

function isBonusValid() {
    var e = "",
        t = $("#promoCode").val();
    return $.each($(".bonus-addOn"), function(a, i) {
        var o = JSON.parse($(this).attr("bonus-data"));
        t.toUpperCase() === o.promoCode.toUpperCase() && (e = !0)
    }), e
}
$(document).ready(function() {
    var e;
    (e = jQuery).fn.extend({
            easyResponsiveTabs: function(t) {
                var a = t = e.extend({
                        type: "default",
                        width: "auto",
                        fit: !0,
                        closed: !1,
                        activate: function() {}
                    }, t),
                    i = a.type,
                    o = a.fit,
                    s = a.width;
                e(this).bind("tabactivate", function(e, a) {
                    "function" == typeof t.activate && t.activate.call(a, e)
                }), this.each(function() {
                    var a, n = e(this),
                        r = n.find("ul.resp-tabs-list");
                    n.find("ul.resp-tabs-list li").addClass("resp-tab-item"), n.css({
                        display: "block",
                        width: s
                    }), n.find(".resp-tabs-container > div").addClass("resp-tab-content"), "vertical" == i && n.addClass("resp-vtabs"), 1 == o && n.css({
                        width: "100%",
                        margin: "0px"
                    }), "accordion" == i && (n.addClass("resp-easy-accordion"), n.find(".resp-tabs-list").css("display", "none")), n.find(".resp-tab-content").before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");
                    var l = 0;
                    n.find(".resp-accordion").each(function() {
                        a = e(this);
                        var t = n.find(".resp-tab-item:eq(" + l + ")").html();
                        n.find(".resp-accordion:eq(" + l + ")").append(t), a.attr("aria-controls", "tab_item-" + l), l++
                    });
                    var d = 0;
                    n.find(".resp-tab-item").each(function() {
                        $tabItem = e(this), $tabItem.attr("aria-controls", "tab_item-" + d), $tabItem.attr("role", "tab"), !0 === t.closed || "accordion" === t.closed && !r.is(":visible") || "tabs" === t.closed && r.is(":visible") || (n.find(".resp-tab-item").first().addClass("resp-tab-active"), n.find(".resp-accordion").first().addClass("resp-tab-active"), n.find(".resp-tab-content").first().addClass("resp-tab-content-active").attr("style", "display:block"));
                        var a = 0;
                        n.find(".resp-tab-content").each(function() {
                            e(this).attr("aria-labelledby", "tab_item-" + a), a++
                        }), d++
                    }), n.find("[role=tab]").each(function() {
                        var t = e(this);
                        t.click(function() {
                            var a = t.attr("aria-controls");
                            return t.hasClass("resp-accordion") && t.hasClass("resp-tab-active") ? (n.find(".resp-tab-content-active").slideUp("", function() {
                                e(this).addClass("resp-accordion-closed")
                            }), t.removeClass("resp-tab-active"), !1) : (!t.hasClass("resp-tab-active") && t.hasClass("resp-accordion") ? (n.find(".resp-tab-active").removeClass("resp-tab-active"), n.find(".resp-tab-content-active").slideUp().removeClass("resp-tab-content-active resp-accordion-closed"), n.find("[aria-controls=" + a + "]").addClass("resp-tab-active"), n.find(".resp-tab-content[aria-labelledby = " + a + "]").slideDown().addClass("resp-tab-content-active")) : (n.find(".resp-tab-active").removeClass("resp-tab-active"), n.find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed"), n.find("[aria-controls=" + a + "]").addClass("resp-tab-active"), n.find(".resp-tab-content[aria-labelledby = " + a + "]").addClass("resp-tab-content-active").attr("style", "display:block")), void t.trigger("tabactivate", t))
                        }), e(window).resize(function() {
                            n.find(".resp-accordion-closed").removeAttr("style")
                        })
                    })
                })
            }
        }),
        function(e, t, a) {
            function i() {
                var e = this;
                e.id = null, e.busy = !1, e.start = function(t, a) {
                    e.busy || (e.stop(), e.id = setTimeout(function() {
                        t(), e.id = null, e.busy = !1
                    }, a), e.busy = !0)
                }, e.stop = function() {
                    null !== e.id && (clearTimeout(e.id), e.id = null, e.busy = !1)
                }
            }
            t.footable = {
                options: {
                    delay: 100,
                    breakpoints: {
                        phone: 740,
                        tablet: 768
                    },
                    parsers: {
                        alpha: function(t) {
                            return e(t).data("value") || e.trim(e(t).text())
                        },
                        numeric: function(t) {
                            var a = e(t).data("value") || e(t).text().replace(/[^0-9.\-]/g, "");
                            return a = parseFloat(a), isNaN(a) && (a = 0), a
                        }
                    },
                    addRowToggle: !0,
                    calculateWidthOverride: null,
                    toggleSelector: " > tbody > tr:not(.footable-row-detail)",
                    columnDataSelector: "> thead > tr:last-child > th, > thead > tr:last-child > td",
                    detailSeparator: ":",
                    createGroupedDetail: function(e) {
                        for (var t = {
                                _none: {
                                    name: null,
                                    data: []
                                }
                            }, a = 0; a < e.length; a++) {
                            var i = e[a].group;
                            null !== i ? (i in t || (t[i] = {
                                name: e[a].groupName || e[a].group,
                                data: []
                            }), t[i].data.push(e[a])) : t._none.data.push(e[a])
                        }
                        return t
                    },
                    createDetail: function(e, t, a, i, o) {
                        var s = a(t);
                        for (var n in s)
                            if (0 !== s[n].data.length) {
                                "_none" !== n && e.append('<div class="' + o.detailInnerGroup + '">' + s[n].name + "</div>");
                                for (var r = 0; r < s[n].data.length; r++) {
                                    var l = s[n].data[r].name ? i : "";
                                    e.append('<div class="' + o.detailInnerRow + '"><div class="' + o.detailInnerName + '">' + s[n].data[r].name + l + '</div><div class="' + o.detailInnerValue + '">' + s[n].data[r].display + "</div></div>")
                                }
                            }
                    },
                    classes: {
                        main: "footable",
                        loading: "footable-loading",
                        loaded: "footable-loaded",
                        toggle: "footable-toggle",
                        disabled: "footable-disabled",
                        detail: "footable-row-detail",
                        detailCell: "footable-row-detail-cell",
                        detailInner: "footable-row-detail-inner",
                        detailInnerRow: "footable-row-detail-row",
                        detailInnerGroup: "footable-row-detail-group",
                        detailInnerName: "footable-row-detail-name",
                        detailInnerValue: "footable-row-detail-value",
                        detailShow: "footable-detail-show"
                    },
                    triggers: {
                        initialize: "footable_initialize",
                        resize: "footable_resize",
                        redraw: "footable_redraw",
                        toggleRow: "footable_toggle_row",
                        expandFirstRow: "footable_expand_first_row"
                    },
                    events: {
                        alreadyInitialized: "footable_already_initialized",
                        initializing: "footable_initializing",
                        initialized: "footable_initialized",
                        resizing: "footable_resizing",
                        resized: "footable_resized",
                        redrawn: "footable_redrawn",
                        breakpoint: "footable_breakpoint",
                        columnData: "footable_column_data",
                        rowDetailUpdating: "footable_row_detail_updating",
                        rowDetailUpdated: "footable_row_detail_updated",
                        rowCollapsed: "footable_row_collapsed",
                        rowExpanded: "footable_row_expanded",
                        rowRemoved: "footable_row_removed"
                    },
                    debug: !1,
                    log: null
                },
                version: {
                    major: 0,
                    minor: 5,
                    toString: function() {
                        return t.footable.version.major + "." + t.footable.version.minor
                    },
                    parse: function(e) {
                        return version = /(\d+)\.?(\d+)?\.?(\d+)?/.exec(e), {
                            major: parseInt(version[1], 10) || 0,
                            minor: parseInt(version[2], 10) || 0,
                            patch: parseInt(version[3], 10) || 0
                        }
                    }
                },
                plugins: {
                    _validate: function(a) {
                        if (!e.isFunction(a)) return !0 === t.footable.options.debug && console.error('Validation failed, expected type "function", received type "{0}".', typeof a), !1;
                        var i = new a;
                        return "string" != typeof i.name ? (!0 === t.footable.options.debug && console.error('Validation failed, plugin does not implement a string property called "name".', i), !1) : e.isFunction(i.init) ? (!0 === t.footable.options.debug && console.log('Validation succeeded for plugin "' + i.name + '".', i), !0) : (!0 === t.footable.options.debug && console.error('Validation failed, plugin "' + i.name + '" does not implement a function called "init".', i), !1)
                    },
                    registered: [],
                    register: function(a, i) {
                        t.footable.plugins._validate(a) && (t.footable.plugins.registered.push(a), "object" == typeof i && e.extend(!0, t.footable.options, i))
                    },
                    load: function(e) {
                        var a, i, o = [];
                        for (i = 0; i < t.footable.plugins.registered.length; i++) try {
                            a = t.footable.plugins.registered[i], o.push(new a(e))
                        } catch (e) {
                            !0 === t.footable.options.debug && console.error(e)
                        }
                        return o
                    },
                    init: function(e) {
                        for (var a = 0; a < e.plugins.length; a++) try {
                            e.plugins[a].init(e)
                        } catch (e) {
                            !0 === t.footable.options.debug && console.error(e)
                        }
                    }
                }
            };
            var o = 0;
            e.fn.footable = function(a) {
                a = a || {};
                var s = e.extend(!0, {}, t.footable.options, a);
                return this.each(function() {
                    var a = new function(a, o, s) {
                        var n = this;
                        n.id = s, n.table = a, n.options = o, n.breakpoints = [], n.breakpointNames = "", n.columns = {}, n.plugins = t.footable.plugins.load(n);
                        var r = n.options,
                            l = r.classes,
                            d = r.events,
                            c = r.triggers,
                            u = 0;
                        return n.timers = {
                            resize: new i,
                            register: function(e) {
                                return n.timers[e] = new i, n.timers[e]
                            }
                        }, n.init = function() {
                            var a = e(t),
                                i = e(n.table);
                            if (t.footable.plugins.init(n), i.hasClass(l.loaded)) n.raise(d.alreadyInitialized);
                            else {
                                n.raise(d.initializing), i.addClass(l.loading), i.find(r.columnDataSelector).each(function() {
                                    var e = n.getColumnData(this);
                                    n.columns[e.index] = e
                                });
                                for (var o in r.breakpoints) n.breakpoints.push({
                                    name: o,
                                    width: r.breakpoints[o]
                                }), n.breakpointNames += o + " ";
                                n.breakpoints.sort(function(e, t) {
                                    return e.width - t.width
                                }), i.bind(c.initialize, function() {
                                    i.removeData("footable_info"), i.data("breakpoint", ""), i.trigger(c.resize), i.removeClass(l.loading), i.addClass(l.loaded).addClass(l.main), n.raise(d.initialized)
                                }).bind(c.redraw, function() {
                                    n.redraw()
                                }).bind(c.resize, function() {
                                    n.resize()
                                }).bind(c.expandFirstRow, function() {
                                    i.find(r.toggleSelector).first().not("." + l.detailShow).trigger(c.toggleRow)
                                }), i.trigger(c.initialize), a.bind("resize.footable", function() {
                                    n.timers.resize.stop(), n.timers.resize.start(function() {
                                        n.raise(c.resize)
                                    }, r.delay)
                                })
                            }
                        }, n.addRowToggle = function() {
                            if (r.addRowToggle) {
                                var t = e(n.table),
                                    a = !1;
                                t.find("span." + l.toggle).remove();
                                for (var i in n.columns) {
                                    var o = n.columns[i];
                                    if (o.toggle) {
                                        a = !0;
                                        var s = "> tbody > tr:not(." + l.detail + ",." + l.disabled + ") > td:nth-child(" + (parseInt(o.index, 10) + 1) + ")";
                                        return void t.find(s).not("." + l.detailCell).prepend(e("<span />").addClass(l.toggle))
                                    }
                                }
                                a || t.find("> tbody > tr:not(." + l.detail + ",." + l.disabled + ") > td:first-child").not("." + l.detailCell).prepend(e("<span />").addClass(l.toggle))
                            }
                        }, n.setColumnClasses = function() {
                            $table = e(n.table);
                            for (var t in n.columns) {
                                var a = n.columns[t];
                                if (null !== a.className) {
                                    var i = "",
                                        o = !0;
                                    e.each(a.matches, function(e, t) {
                                        o || (i += ", "), i += "> tbody > tr:not(." + l.detail + ") > td:nth-child(" + (parseInt(t, 10) + 1) + ")", o = !1
                                    }), $table.find(i).not("." + l.detailCell).addClass(a.className)
                                }
                            }
                        }, n.bindToggleSelectors = function() {
                            var t = e(n.table);
                            n.hasAnyBreakpointColumn() && (t.find(r.toggleSelector).unbind(c.toggleRow).bind(c.toggleRow, function(t) {
                                var a = e(this).is("tr") ? e(this) : e(this).parents("tr:first");
                                n.toggleDetail(a.get(0))
                            }), t.find(r.toggleSelector).unbind("click.footable").bind("click.footable", function(a) {
                                t.is(".breakpoint") && e(a.target).is("td,." + l.toggle) && e(this).trigger(c.toggleRow)
                            }))
                        }, n.parse = function(e, t) {
                            return (r.parsers[t.type] || r.parsers.alpha)(e)
                        }, n.getColumnData = function(t) {
                            var a = e(t),
                                i = a.data("hide"),
                                o = a.index();
                            i = i || "", i = jQuery.map(i.split(","), function(e) {
                                return jQuery.trim(e)
                            });
                            var s = {
                                index: o,
                                hide: {},
                                type: a.data("type") || "alpha",
                                name: a.data("name") || e.trim(a.text()),
                                ignore: a.data("ignore") || !1,
                                toggle: a.data("toggle") || !1,
                                className: a.data("class") || null,
                                matches: [],
                                names: {},
                                group: a.data("group") || null,
                                groupName: null
                            };
                            if (null !== s.group) {
                                var l = e(n.table).find('> thead > tr.footable-group-row > th[data-group="' + s.group + '"], > thead > tr.footable-group-row > td[data-group="' + s.group + '"]').first();
                                s.groupName = n.parse(l, {
                                    type: "alpha"
                                })
                            }
                            var c = parseInt(a.prev().attr("colspan") || 0, 10);
                            u += c > 1 ? c - 1 : 0;
                            var f = parseInt(a.attr("colspan") || 0, 10),
                                p = s.index + u;
                            if (f > 1) {
                                var v = a.data("names");
                                v = (v = v || "").split(",");
                                for (var m = 0; f > m; m++) s.matches.push(m + p), m < v.length && (s.names[m + p] = v[m])
                            } else s.matches.push(p);
                            s.hide.default = "all" === a.data("hide") || e.inArray("default", i) >= 0;
                            var _ = !1;
                            for (var g in r.breakpoints) s.hide[g] = "all" === a.data("hide") || e.inArray(g, i) >= 0, _ = _ || s.hide[g];
                            return s.hasBreakpoint = _, n.raise(d.columnData, {
                                column: {
                                    data: s,
                                    th: t
                                }
                            }).column.data
                        }, n.getViewportWidth = function() {
                            return window.innerWidth || (document.body ? document.body.offsetWidth : 0)
                        }, n.calculateWidth = function(e, t) {
                            return jQuery.isFunction(r.calculateWidthOverride) ? r.calculateWidthOverride(e, t) : (t.viewportWidth < t.width && (t.width = t.viewportWidth), t.parentWidth < t.width && (t.width = t.parentWidth), t)
                        }, n.hasBreakpointColumn = function(e) {
                            for (var t in n.columns)
                                if (n.columns[t].hide[e]) {
                                    if (n.columns[t].ignore) continue;
                                    return !0
                                }
                            return !1
                        }, n.hasAnyBreakpointColumn = function() {
                            for (var e in n.columns)
                                if (n.columns[e].hasBreakpoint) return !0;
                            return !1
                        }, n.resize = function() {
                            var t = e(n.table);
                            if (t.is(":visible") && n.hasAnyBreakpointColumn()) {
                                var a = {
                                    width: t.width(),
                                    viewportWidth: n.getViewportWidth(),
                                    parentWidth: t.parent().width()
                                };
                                a = n.calculateWidth(t, a);
                                var i = t.data("footable_info");
                                if (t.data("footable_info", a), n.raise(d.resizing, {
                                        old: i,
                                        info: a
                                    }), !i || i && i.width && i.width !== a.width) {
                                    for (var o, s = null, r = 0; r < n.breakpoints.length; r++)
                                        if (o = n.breakpoints[r], o && o.width && a.width <= o.width) {
                                            s = o;
                                            break
                                        }
                                    var l = null === s ? "default" : s.name,
                                        u = n.hasBreakpointColumn(l),
                                        f = t.data("breakpoint");
                                    t.data("breakpoint", l).removeClass("default breakpoint").removeClass(n.breakpointNames).addClass(l + (u ? " breakpoint" : "")), l !== f && (t.trigger(c.redraw), n.raise(d.breakpoint, {
                                        breakpoint: l,
                                        info: a
                                    }))
                                }
                                n.raise(d.resized, {
                                    old: i,
                                    info: a
                                })
                            }
                        }, n.redraw = function() {
                            n.addRowToggle(), n.bindToggleSelectors(), n.setColumnClasses();
                            var t = e(n.table),
                                a = t.data("breakpoint"),
                                i = n.hasBreakpointColumn(a);
                            t.find("> tbody > tr:not(." + l.detail + ")").data("detail_created", !1).end().find("> thead > tr:last-child > th").each(function() {
                                var i = n.columns[e(this).index()],
                                    o = "",
                                    s = !0;
                                e.each(i.matches, function(e, t) {
                                    s || (o += ", ");
                                    var a = t + 1;
                                    o += "> tbody > tr:not(." + l.detail + ") > td:nth-child(" + a + ")", o += ", > tfoot > tr:not(." + l.detail + ") > td:nth-child(" + a + ")", o += ", > colgroup > col:nth-child(" + a + ")", s = !1
                                }), o += ', > thead > tr[data-group-row="true"] > th[data-group="' + i.group + '"]';
                                var r = t.find(o).add(this);
                                if (!1 === i.hide[a] ? r.show() : r.hide(), 1 === t.find("> thead > tr.footable-group-row").length) {
                                    var d = t.find('> thead > tr:last-child > th[data-group="' + i.group + '"]:visible, > thead > tr:last-child > th[data-group="' + i.group + '"]:visible'),
                                        c = t.find('> thead > tr.footable-group-row > th[data-group="' + i.group + '"], > thead > tr.footable-group-row > td[data-group="' + i.group + '"]'),
                                        u = 0;
                                    e.each(d, function() {
                                        u += parseInt(e(this).attr("colspan") || 1, 10)
                                    }), u > 0 ? c.attr("colspan", u).show() : c.hide()
                                }
                            }).end().find("> tbody > tr." + l.detailShow).each(function() {
                                n.createOrUpdateDetailRow(this)
                            }), t.find("> tbody > tr." + l.detailShow + ":visible").each(function() {
                                var t = e(this).next();
                                t.hasClass(l.detail) && (i ? t.show() : t.hide())
                            }), t.find("> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column").removeClass("footable-last-column"), t.find("> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column").removeClass("footable-first-column"), t.find("> thead > tr, > tbody > tr").find("> th:visible:last, > td:visible:last").addClass("footable-last-column").end().find("> th:visible:first, > td:visible:first").addClass("footable-first-column"), n.raise(d.redrawn)
                        }, n.toggleDetail = function(t) {
                            var a = t.jquery ? t : e(t),
                                i = a.next();
                            a.hasClass(l.detailShow) ? (a.removeClass(l.detailShow), i.hasClass(l.detail) && i.hide(), n.raise(d.rowCollapsed, {
                                row: a[0]
                            })) : (n.createOrUpdateDetailRow(a[0]), a.addClass(l.detailShow), a.next().show(), n.raise(d.rowExpanded, {
                                row: a[0]
                            }))
                        }, n.removeRow = function(t) {
                            var a = t.jquery ? t : e(t);
                            a.hasClass(l.detail) && (a = a.prev());
                            var i = a.next();
                            !0 === a.data("detail_created") && i.remove(), a.remove(), n.raise(d.rowRemoved)
                        }, n.appendRow = function(t) {
                            var a = t.jquery ? t : e(t);
                            e(n.table).find("tbody").append(a), n.redraw()
                        }, n.getColumnFromTdIndex = function(t) {
                            var a = null;
                            for (var i in n.columns)
                                if (e.inArray(t, n.columns[i].matches) >= 0) {
                                    a = n.columns[i];
                                    break
                                }
                            return a
                        }, n.createOrUpdateDetailRow = function(t) {
                            var a, i = e(t),
                                o = i.next(),
                                s = [];
                            if (!0 === i.data("detail_created")) return !0;
                            if (i.is(":hidden")) return !1;
                            if (n.raise(d.rowDetailUpdating, {
                                    row: i,
                                    detail: o
                                }), i.find("> td:hidden").each(function() {
                                    var t = e(this).index(),
                                        a = n.getColumnFromTdIndex(t),
                                        i = a.name;
                                    return !0 === a.ignore || (t in a.names && (i = a.names[t]), s.push({
                                        name: i,
                                        value: n.parse(this, a),
                                        display: e.trim(e(this).html()),
                                        group: a.group,
                                        groupName: a.groupName
                                    }), !0)
                                }), 0 === s.length) return !1;
                            var c = i.find("> td:visible").length,
                                u = o.hasClass(l.detail);
                            return u || (o = e('<tr class="' + l.detail + '"><td class="' + l.detailCell + '"><div class="' + l.detailInner + '"></div></td></tr>'), i.after(o)), o.find("> td:first").attr("colspan", c), a = o.find("." + l.detailInner).empty(), r.createDetail(a, s, r.createGroupedDetail, r.detailSeparator, l), i.data("detail_created", !0), n.raise(d.rowDetailUpdated, {
                                row: i,
                                detail: o
                            }), !u
                        }, n.raise = function(t, a) {
                            !0 === n.options.debug && e.isFunction(n.options.log) && n.options.log(t, "event"), a = a || {};
                            var i = {
                                ft: n
                            };
                            e.extend(!0, i, a);
                            var o = e.Event(t, i);
                            return o.ft || e.extend(!0, o, i), e(n.table).trigger(o), o
                        }, n.init(), n
                    }(this, s, ++o);
                    e(this).data("footable", a)
                })
            }
        }(jQuery, window),
        function(e, t, a) {
            if (void 0 === t.footable || null === t.footable) throw new Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
            t.footable.plugins.register(function() {
                var t = this;
                t.name = "Footable Paginate", t.init = function(a) {
                    if (!0 === a.options.paginate) {
                        if (!1 === e(a.table).data("page")) return;
                        e(a.table).bind({
                            footable_initialized: function() {
                                a.pageInfo = new function(t) {
                                    var a = e(t.table);
                                    a.find("> tbody"), this.pageNavigation = a.data("page-navigation") || t.options.pageNavigation, this.pageSize = a.data("page-size") || t.options.pageSize, this.firstText = a.data("page-first-text") || t.options.firstText, this.previousText = a.data("page-previous-text") || t.options.previousText, this.nextText = a.data("page-next-text") || t.options.nextText, this.lastText = a.data("page-last-text") || t.options.lastText, this.currentPage = 0, this.pages = [], this.control = !1
                                }(a), a.raise("footable_setup_paging")
                            },
                            "footable_row_removed footable_redrawn footable_sorted footable_filtered footable_setup_paging": function() {
                                a.pageInfo && t.setupPaging(a)
                            }
                        })
                    }
                }, t.setupPaging = function(a) {
                    var i = e(a.table).find("> tbody");
                    t.createPages(a, i), t.createNavigation(a, i), t.fillPage(a, i, a.pageInfo.currentPage)
                }, t.createPages = function(t, a) {
                    var i = 1,
                        o = t.pageInfo,
                        s = i * o.pageSize,
                        n = [],
                        r = [];
                    o.pages = [];
                    var l = a.find("> tr:not(.footable-filtered,.footable-row-detail)");
                    l.each(function(e, t) {
                        n.push(t), e === s - 1 ? (o.pages.push(n), s = ++i * o.pageSize, n = []) : e >= l.length - l.length % o.pageSize && r.push(t)
                    }), r.length > 0 && o.pages.push(r), o.currentPage >= o.pages.length && (o.currentPage = o.pages.length - 1), o.currentPage < 0 && (o.currentPage = 0), 1 === o.pages.length ? e(t.table).addClass("no-paging") : e(t.table).removeClass("no-paging")
                }, t.createNavigation = function(a, i) {
                    var o = e(a.table).find(a.pageInfo.pageNavigation);
                    if (0 === o.length) {
                        if ((o = e(a.pageInfo.pageNavigation)).parents("table:first") !== e(a.table)) return;
                        o.length > 1 && !0 === a.options.debug && console.error("More than one pagination control was found!")
                    }
                    if (0 !== o.length) {
                        o.is("ul") || (0 === o.find("ul:first").length && o.append("<ul />"), o = o.find("ul")), o.find("li").remove();
                        var s = a.pageInfo;
                        s.control = o, s.pages.length > 0 && (o.append('<li class="footable-page-arrow"><a data-page="prev" href="#prev" class="prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>'), e.each(s.pages, function(e, t) {
                            t.length > 0 && o.append('<li class="footable-page"><a class="page_number" data-page="' + e + '" href="#">' + (e + 1) + "</a></li>")
                        }), o.append('<li class="footable-page-arrow"><a data-page="next" href="#next" class="next"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>')), o.find("a").click(function(i) {
                            i.preventDefault();
                            var o = e(this).data("page"),
                                n = s.currentPage;
                            "first" === o ? n = 0 : "prev" === o ? n > 0 && n-- : "next" === o ? n < s.pages.length - 1 && n++ : n = "last" === o ? s.pages.length - 1 : o, t.paginate(a, n)
                        }), t.setPagingClasses(o, s.currentPage, s.pages.length)
                    }
                }, t.paginate = function(a, i) {
                    var o = a.pageInfo;
                    if (o.currentPage !== i) {
                        var s = e(a.table).find("> tbody"),
                            n = a.raise("footable_paging", {
                                page: i,
                                size: o.pageSize
                            });
                        if (n && !1 === n.result) return;
                        t.fillPage(a, s, i), o.control.find("li").removeClass("active disabled"), t.setPagingClasses(o.control, o.currentPage, o.pages.length)
                    }
                }, t.setPagingClasses = function(e, t, a) {
                    e.find("li.footable-page > a[data-page=" + t + "]").parent().addClass("active"), t >= a - 1 && (e.find('li.footable-page-arrow > a[data-page="next"]').parent().addClass("disabled"), e.find('li.footable-page-arrow > a[data-page="last"]').parent().addClass("disabled")), 1 > t && (e.find('li.footable-page-arrow > a[data-page="first"]').parent().addClass("disabled"), e.find('li.footable-page-arrow > a[data-page="prev"]').parent().addClass("disabled"))
                }, t.fillPage = function(a, i, o) {
                    a.pageInfo.currentPage = o, i.find("> tr").hide(), e(a.pageInfo.pages[o]).each(function() {
                        t.showRow(this, a)
                    })
                }, t.showRow = function(t, a) {
                    var i = e(t),
                        o = i.next();
                    e(a.table).hasClass("breakpoint") && i.hasClass("footable-detail-show") && o.hasClass("footable-row-detail") ? (i.add(o).show(), a.createOrUpdateDetailRow(t)) : i.show()
                }
            }, {
                paginate: !0,
                pageSize: 10,
                pageNavigation: ".pagination",
                previousText: "&lsaquo;",
                nextText: "&rsaquo;"
            })
        }(jQuery, window),
        function(e, t, a) {
            if (void 0 === t.footable || null === t.footable) throw new Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");
            var i = {
                filter: {
                    enabled: !0,
                    input: ".footable-filter",
                    timeout: 300,
                    minimum: 1,
                    disableEnter: !1,
                    filterFunction: function(t) {
                        var a = e(this),
                            i = a.parents("table:first"),
                            o = i.data("current-filter").toUpperCase(),
                            s = a.find("td").text();
                        return i.data("filter-text-only") || a.find("td[data-value]").each(function() {
                            s += e(this).data("value")
                        }), s.toUpperCase().indexOf(o) >= 0
                    }
                }
            };
            t.footable.plugins.register(function() {
                var t = this;
                t.name = "Footable Filter", t.init = function(a) {
                    if (t.footable = a, !0 === a.options.filter.enabled) {
                        if (!1 === e(a.table).data("filter")) return;
                        a.timers.register("filter"), e(a.table).bind({
                            footable_initialized: function(i) {
                                var o = e(a.table),
                                    s = {
                                        input: o.data("filter") || a.options.filter.input,
                                        timeout: o.data("filter-timeout") || a.options.filter.timeout,
                                        minimum: o.data("filter-minimum") || a.options.filter.minimum,
                                        disableEnter: o.data("filter-disable-enter") || a.options.filter.disableEnter
                                    };
                                s.disableEnter && e(s.input).keypress(function(e) {
                                    return window.event ? 13 !== window.event.keyCode : 13 !== e.which
                                }), o.bind("footable_clear_filter", function() {
                                    e(s.input).val(""), t.clearFilter()
                                }), o.bind("footable_filter", function(e, a) {
                                    t.filter(a.filter)
                                }), e(s.input).keyup(function(i) {
                                    a.timers.filter.stop(), 27 === i.which && e(s.input).val(""), a.timers.filter.start(function() {
                                        var a = e(s.input).val() || "";
                                        t.filter(a)
                                    }, s.timeout)
                                })
                            },
                            footable_redrawn: function(i) {
                                var o = e(a.table).data("filter-string");
                                o && t.filter(o)
                            }
                        }).data("footable-filter", t)
                    }
                }, t.filter = function(a) {
                    var i = t.footable,
                        o = e(i.table),
                        s = o.data("filter-minimum") || i.options.filter.minimum,
                        n = !a,
                        r = i.raise("footable_filtering", {
                            filter: a,
                            clear: n
                        });
                    if (!(r && !1 === r.result || r.filter && r.filter.length < s))
                        if (r.clear) t.clearFilter();
                        else {
                            var l = r.filter.split(" ");
                            o.find("> tbody > tr").hide().addClass("footable-filtered");
                            var d = o.find("> tbody > tr:not(.footable-row-detail)");
                            e.each(l, function(e, t) {
                                t && t.length > 0 && (o.data("current-filter", t), d = d.filter(i.options.filter.filterFunction))
                            }), d.each(function() {
                                t.showRow(this, i), e(this).removeClass("footable-filtered")
                            }), o.data("filter-string", r.filter), i.raise("footable_filtered", {
                                filter: r.filter,
                                clear: !1
                            })
                        }
                }, t.clearFilter = function() {
                    var a = t.footable,
                        i = e(a.table);
                    i.find("> tbody > tr:not(.footable-row-detail)").removeClass("footable-filtered").each(function() {
                        t.showRow(this, a)
                    }), i.removeData("filter-string"), a.raise("footable_filtered", {
                        clear: !0
                    })
                }, t.showRow = function(t, a) {
                    var i = e(t),
                        o = i.next(),
                        s = e(a.table);
                    i.is(":visible") || (s.hasClass("breakpoint") && i.hasClass("footable-detail-show") && o.hasClass("footable-row-detail") ? (i.add(o).show(), a.createOrUpdateDetailRow(t)) : i.show())
                }
            }, i)
        }(jQuery, window),
        function(e) {
            function t(e, t, o) {
                var s = e[0],
                    n = /er/.test(o) ? _ : /bl/.test(o) ? v : f,
                    r = o == g ? {
                        checked: s[f],
                        disabled: s[v],
                        indeterminate: "true" == e.attr(_) || "false" == e.attr(m)
                    } : s[n];
                if (/^(ch|di|in)/.test(o) && !r) a(e, n);
                else if (/^(un|en|de)/.test(o) && r) i(e, n);
                else if (o == g)
                    for (var l in r) r[l] ? a(e, l, !0) : i(e, l, !0);
                else t && "toggle" != o || (t || e[y]("ifClicked"), r ? s[h] !== u && i(e, n) : a(e, n))
            }

            function a(t, a, o) {
                var c = t[0],
                    g = t.parent(),
                    b = a == f,
                    C = a == _,
                    y = a == v,
                    k = C ? m : b ? p : "enabled",
                    T = s(t, k + n(c[h])),
                    S = s(t, a + n(c[h]));
                if (!0 !== c[a]) {
                    if (!o && a == f && c[h] == u && c.name) {
                        var D = t.closest("form"),
                            z = 'input[name="' + c.name + '"]';
                        (z = D.length ? D.find(z) : e(z)).each(function() {
                            this !== c && e(this).data(l) && i(e(this), a)
                        })
                    }
                    C ? (c[a] = !0, c[f] && i(t, f, "force")) : (o || (c[a] = !0), b && c[_] && i(t, _, !1)), r(t, b, a, o)
                }
                c[v] && s(t, x, !0) && g.find("." + d).css(x, "default"), g[$](S || s(t, a) || ""), g.attr("role") && !C && g.attr("aria-" + (y ? v : f), "true"), g[w](T || s(t, k) || "")
            }

            function i(e, t, a) {
                var i = e[0],
                    o = e.parent(),
                    l = t == f,
                    c = t == _,
                    u = t == v,
                    g = c ? m : l ? p : "enabled",
                    b = s(e, g + n(i[h])),
                    C = s(e, t + n(i[h]));
                !1 !== i[t] && ((c || !a || "force" == a) && (i[t] = !1), r(e, l, g, a)), !i[v] && s(e, x, !0) && o.find("." + d).css(x, "pointer"), o[w](C || s(e, t) || ""), o.attr("role") && !c && o.attr("aria-" + (u ? v : f), "false"), o[$](b || s(e, g) || "")
            }

            function o(t, a) {
                t.data(l) && (t.parent().html(t.attr("style", t.data(l).s || "")), a && t[y](a), t.off(".i").unwrap(), e(k + '[for="' + t[0].id + '"]').add(t.closest(k)).off(".i"))
            }

            function s(e, t, a) {
                return e.data(l) ? e.data(l).o[t + (a ? "" : "Class")] : void 0
            }

            function n(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }

            function r(e, t, a, i) {
                i || (t && e[y]("ifToggled"), e[y]("ifChanged")[y]("if" + n(a)))
            }
            var l = "iCheck",
                d = l + "-helper",
                c = "checkbox",
                u = "radio",
                f = "checked",
                p = "un" + f,
                v = "disabled",
                m = "determinate",
                _ = "in" + m,
                g = "update",
                h = "type",
                b = "click",
                C = "touchbegin.i touchend.i",
                $ = "addClass",
                w = "removeClass",
                y = "trigger",
                k = "label",
                x = "cursor",
                T = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
            e.fn[l] = function(s, n) {
                var r = 'input[type="' + c + '"], input[type="' + u + '"]',
                    p = e(),
                    m = function(t) {
                        t.each(function() {
                            var t = e(this);
                            p = t.is(r) ? p.add(t) : p.add(t.find(r))
                        })
                    };
                if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(s)) return s = s.toLowerCase(), m(this), p.each(function() {
                    var a = e(this);
                    "destroy" == s ? o(a, "ifDestroyed") : t(a, !0, s), e.isFunction(n) && n()
                });
                if ("object" != typeof s && s) return this;
                var x = e.extend({
                        checkedClass: f,
                        disabledClass: v,
                        indeterminateClass: _,
                        labelHover: !0
                    }, s),
                    S = x.handle,
                    D = x.hoverClass || "hover",
                    z = x.focusClass || "focus",
                    I = x.activeClass || "active",
                    R = !!x.labelHover,
                    P = x.labelHoverClass || "hover",
                    j = 0 | ("" + x.increaseArea).replace("%", "");
                return (S == c || S == u) && (r = 'input[type="' + S + '"]'), -50 > j && (j = -50), m(this), p.each(function() {
                    var s = e(this);
                    o(s);
                    var n, r = this,
                        p = r.id,
                        m = -j + "%",
                        _ = 100 + 2 * j + "%",
                        S = {
                            position: "absolute",
                            top: m,
                            left: m,
                            display: "block",
                            width: _,
                            height: _,
                            margin: 0,
                            padding: 0,
                            background: "#fff",
                            border: 0,
                            opacity: 0
                        },
                        N = T ? {
                            position: "absolute",
                            visibility: "hidden"
                        } : j ? S : {
                            position: "absolute",
                            opacity: 0
                        },
                        F = r[h] == c ? x.checkboxClass || "i" + c : x.radioClass || "i" + u,
                        B = e(k + '[for="' + p + '"]').add(s.closest(k)),
                        U = !!x.aria,
                        V = l + "-" + Math.random().toString(36).substr(2, 6),
                        A = '<div class="' + F + '" ' + (U ? 'role="' + r[h] + '" ' : "");
                    U && B.each(function() {
                        A += 'aria-labelledby="', this.id ? A += this.id : (this.id = V, A += V), A += '"'
                    }), A = s.wrap(A + "/>")[y]("ifCreated").parent().append(x.insert), n = e('<ins class="' + d + '"/>').css(S).appendTo(A), s.data(l, {
                        o: x,
                        s: s.attr("style")
                    }).css(N), !!x.inheritClass && A[$](r.className || ""), !!x.inheritID && p && A.attr("id", l + "-" + p), "static" == A.css("position") && A.css("position", "relative"), t(s, !0, g), B.length && B.on(b + ".i mouseover.i mouseout.i " + C, function(a) {
                        var i = a[h],
                            o = e(this);
                        if (!r[v]) {
                            if (i == b) {
                                if (e(a.target).is("a")) return;
                                t(s, !1, !0)
                            } else R && (/ut|nd/.test(i) ? (A[w](D), o[w](P)) : (A[$](D), o[$](P)));
                            if (!T) return !1;
                            a.stopPropagation()
                        }
                    }), s.on(b + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(e) {
                        var t = e[h],
                            o = e.keyCode;
                        return t != b && ("keydown" == t && 32 == o ? (r[h] == u && r[f] || (r[f] ? i(s, f) : a(s, f)), !1) : void("keyup" == t && r[h] == u ? !r[f] && a(s, f) : /us|ur/.test(t) && A["blur" == t ? w : $](z)))
                    }), n.on(b + " mousedown mouseup mouseover mouseout " + C, function(e) {
                        var a = e[h],
                            i = /wn|up/.test(a) ? I : D;
                        if (!r[v]) {
                            if (a == b ? t(s, !1, !0) : (/wn|er|in/.test(a) ? A[$](i) : A[w](i + " " + I), B.length && R && i == D && B[/ut|nd/.test(a) ? w : $](P)), !T) return !1;
                            e.stopPropagation()
                        }
                    })
                })
            }
        }(window.jQuery || window.Zepto), (bookmarkscroll = {
            setting: {
                duration: 2e3,
                yoffset: -20
            },
            topkeyword: "#top",
            scrollTo: function(e, t, a) {
                var i = jQuery,
                    o = (t = t || {}, "string" == typeof e && e.length > 0 ? e == this.topkeyword ? 0 : i("#" + e) : e ? i(e) : []);
                (0 === o || 1 == o.length && (!t.autorun || t.autorun && Math.abs(o.offset().top + (t.yoffset || this.setting.yoffset) - i(window).scrollTop()) > 5)) && this.$body.animate({
                    scrollTop: 0 === o ? 0 : o.offset().top + (t.yoffset || this.setting.yoffset)
                }, t.duration || this.setting.duration, function() {
                    0 !== o && a && (location.hash = a)
                })
            },
            urlparamselect: function() {
                var e = window.location.search.match(/scrollto=[\w\-_,]+/i);
                return e ? e[0].split("=")[1] : null
            },
            init: function() {
                console.log("akjasj aksjajkj as");
                var e = bookmarkscroll;
                e.$body = $(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body");
                var t = e.urlparamselect();
                t && setTimeout(function() {
                    e.scrollTo(document.getElementById(t) || $("a[name=" + t + "]:eq(0)").get(0), {
                        autorun: !0
                    })
                }, 100), $('a[href^="#"]').each(function() {
                    var t = this.getAttribute("href").match(/#\w+$/i);
                    if (t = t ? t[0].substring(1) : null, this.hash.length > 1) {
                        var a = $("a[name=" + this.hash.substr(1) + "]:eq(0)");
                        (1 == a.length || this.hash == e.topkeyword) && (1 != a.length || document.all || a.html(".").css({
                            position: "absolute",
                            fontSize: 1,
                            visibility: "hidden"
                        }), $(this).click(function(t) {
                            e.scrollTo(this.hash == e.topkeyword ? e.topkeyword : a.get(0), {}, this.hash), t.preventDefault()
                        }))
                    }
                })
            }
        }).init()
}), $(document).ready(function() {
    $(function() {
        $(".table").length && $(".table").footable(), $(".clear-filter").length && $(".clear-filter").click(function(e) {
            e.preventDefault(), $("table.demo").trigger("footable_clear_filter"), $(".filter-status").val("")
        }), $(".filter-status").length && $(".filter-status").change(function(e) {
            e.preventDefault();
            var t = $(this).val();
            $("#filter").val($(this).text()), $("table.demo").trigger("footable_filter", {
                filter: t
            })
        })
    }),$('.banner_withform').slick({
            dots: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            arrows: true,
            speed: 500,
            responsive: [{
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });$('.home_mobile_banner').slick({
            dots: false,
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            arrows: true,
            speed: 500,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });$('.winners_speak_slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 820,
      settings: {
		slidesToShow: 2
      }
    },
    {
      breakpoint: 570,
      settings: {
		slidesToShow: 1,
      }
    }
  ]
}); $("#featuresTab").length > 0 && $("#featuresTab").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0
    }), $(".post_login_popup_banner").length > 0 && $(".post_login_popup_banner").slick({
        autoplay: !0,
        autoplaySpeed: 3e3,
        infinite: !0,
        arrows: !0,
        speed: 500
    }), $(".player_speak").length > 0 && $(".player_speak").slick({
        dots: !1,
        autoplay: !0,
        autoplaySpeed: 3e3,
        infinite: !0,
        arrows: !0,
        speed: 1e3
    }), $(".accordion_example2").length > 0 && $(".accordion_example2").smk_Accordion({
        closeAble: !0
    }), $("#cashiertab").length > 0 && $("#cashiertab").easyResponsiveTabs({
        type: "vertical",
        width: "auto",
        fit: !0
    }), $("#withdrawltab").length > 0 && $("#withdrawltab").easyResponsiveTabs({
        type: "vertical",
        width: "auto",
        fit: !0
    }), $(function(){setTimeout(function(){$("input, textarea").placeholder({customClass:"my-placeholder"})}, 500)}), $("input").length > 0 && $("input").iCheck({
        checkboxClass: "icheckbox_square-green",
        radioClass: "iradio_square-green",
        increaseArea: "20%"
    }), $("#amount_10000_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_10000_div").addClass("selected"), !0 === isBonusValid() && $("#amount_10000_div").removeClass("no_bonus")
    }), $("#amount_5000_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_5000_div").addClass("selected"), !0 === isBonusValid() && $("#amount_5000_div").removeClass("no_bonus")
    }), $("#amount_2000_div").on("ifClicked", function(e) {
        $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_2000_div").addClass("selected"), !0 === isBonusValid() && $("#amount_2000_div").removeClass("no_bonus")
    }), $("#amount_1000_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_1000_div").addClass("selected"), !0 === isBonusValid() && $("#amount_1000_div").removeClass("no_bonus")
    }), $("#amount_500_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_500_div").addClass("selected"), !0 === isBonusValid() && $("#amount_500_div").removeClass("no_bonus")
    }), $("#amount_100_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_100_div").addClass("selected"), !0 === isBonusValid() && $("#amount_100_div").removeClass("no_bonus")
    }), $("#amount_50_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_50_div").addClass("selected"), !0 === isBonusValid() && $("#amount_50_div").removeClass("no_bonus")
    }), $("#amount_other_div").on("ifClicked", function(e) {
        $("#amount_10000_div").removeClass("selected"), $("#amount_2000_div").removeClass("selected"), $("#amount_5000_div").removeClass("selected"), $("#amount_1000_div").removeClass("selected"), $("#amount_500_div").removeClass("selected"), $("#amount_100_div").removeClass("selected"), $("#amount_50_div").removeClass("selected"), $("#amount_other_div").removeClass("selected"), $("#amount_other_div").addClass("selected")
    }), $("#Debit_visa_div").on("ifClicked", function(e) {
        $("#Debit_mastercard_div").removeClass("selected"), $("#Debit_maestro_div").removeClass("selected"), $("#Debit_americanexpress_div").removeClass("selected"), $("#Debit_rupay_div").removeClass("selected"), $("#Debit_visa_div").addClass("selected")
    }), $("#Debit_mastercard_div").on("ifClicked", function(e) {
        $("#Debit_visa_div").removeClass("selected"), $("#Debit_maestro_div").removeClass("selected"), $("#Debit_americanexpress_div").removeClass("selected"), $("#Debit_rupay_div").removeClass("selected"), $("#Debit_mastercard_div").addClass("selected")
    }), $("#Debit_maestro_div").on("ifClicked", function(e) {
        $("#Debit_visa_div").removeClass("selected"), $("#Debit_mastercard_div").removeClass("selected"), $("#Debit_americanexpress_div").removeClass("selected"), $("#Debit_rupay_div").removeClass("selected"), $("#Debit_maestro_div").addClass("selected")
    }), $("#Debit_americanexpress_div").on("ifClicked", function(e) {
        $("#Debit_visa_div").removeClass("selected"), $("#Debit_mastercard_div").removeClass("selected"), $("#Debit_maestro_div").removeClass("selected"), $("#Debit_rupay_div").removeClass("selected"), $("#Debit_americanexpress_div").addClass("selected")
    }), $("#Debit_rupay_div").on("ifClicked", function(e) {
        $("#Debit_visa_div").removeClass("selected"), $("#Debit_mastercard_div").removeClass("selected"), $("#Debit_maestro_div").removeClass("selected"), $("#Debit_americanexpress_div").removeClass("selected"), $("#Debit_rupay_div").addClass("selected"), $("#rupayMsg").modal("show")
    }), $("#Credit_visa_div").on("ifClicked", function(e) {
        $("#Credit_mastercard_div").removeClass("selected"), $("#Credit_maestro_div").removeClass("selected"), $("#Credit_americanexpress_div").removeClass("selected"), $("#Credit_rupay_div").removeClass("selected"), $("#Credit_visa_div").addClass("selected")
    }), $("#Credit_mastercard_div").on("ifClicked", function(e) {
        $("#Credit_visa_div").removeClass("selected"), $("#Credit_maestro_div").removeClass("selected"), $("#Credit_americanexpress_div").removeClass("selected"), $("#Credit_rupay_div").removeClass("selected"), $("#Credit_mastercard_div").addClass("selected")
    }), $("#Credit_maestro_div").on("ifClicked", function(e) {
        $("#Credit_visa_div").removeClass("selected"), $("#Credit_mastercard_div").removeClass("selected"), $("#Credit_americanexpress_div").removeClass("selected"), $("#Credit_rupay_div").removeClass("selected"), $("#Credit_maestro_div").addClass("selected")
    }), $("#Credit_americanexpress_div").on("ifClicked", function(e) {
        $("#Credit_visa_div").removeClass("selected"), $("#Credit_mastercard_div").removeClass("selected"), $("#Credit_maestro_div").removeClass("selected"), $("#Credit_rupay_div").removeClass("selected"), $("#Credit_americanexpress_div").addClass("selected")
    }), $("#Credit_rupay_div").on("ifClicked", function(e) {
        $("#Credit_visa_div").removeClass("selected"), $("#Credit_mastercard_div").removeClass("selected"), $("#Credit_maestro_div").removeClass("selected"), $("#Credit_americanexpress_div").removeClass("selected"), $("#Credit_rupay_div").addClass("selected"), $("#rupayMsg").modal("show")
    }), $(".tabs-menu a").click(function(e) {
        e.preventDefault(), $(this).parent().addClass("current"), $(this).parent().siblings().removeClass("current");
        var t = $(this).attr("href");
        $(".tab-content").not(t).css("display", "none"), $(t).fadeIn()
    }), $("#redeemtab").length > 0 && $("#redeemtab").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0,
        activate: function(e, t) {
            $(".redeem_merchandise").slick("setPosition"), $(".redeem_cash").slick("setPosition")
        }
    }), $(".redeem_cash").length > 0 && $(".redeem_cash").slick({
        dots: !1,
        autoplay: !1,
        autoplaySpeed: 3e3,
        infinite: !1,
        arrows: !0,
        speed: 1e3,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 801,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 740,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 668,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 601,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 416,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }), $(".redeem_merchandise").length > 0 && $(".redeem_merchandise").slick({
        dots: !1,
        autoplay: !1,
        autoplaySpeed: 3e3,
        infinite: !1,
        arrows: !0,
        speed: 1e3,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 801,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 740,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 668,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 601,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 416,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }), $("#upload_doc_tab").length > 0 && $("#upload_doc_tab").easyResponsiveTabs({
        type: "default",
        width: "auto",
        fit: !0
    }), setTimeout(function(){$(".scrollbar-outer").scrollbar()}, 500), $(window).scroll(function() {
        $(this).scrollTop() > 300 ? $(".scrollToTop").fadeIn() : $(".scrollToTop").fadeOut()
    }), $(".scrollToTop").click(function() {
        return $("html, body").animate({
            scrollTop: 0
        }, 800), !1
    })
}), $(window).load(function() {
    $(".isotope").isotope({
        itemSelector: ".sitemapbox",
        layoutMode: "masonry"
    })
}), $(document).ready(function() {}), $(document).ready(function() {
    $("#terms_button").click(function() {
        $("#terms_ul_holder").toggle(), $("#terms_plus_icon").toggle(), $("#terms_minus_icon").toggle()
    }), $("#app_20k").click(function() {
        $("#app_20k_holder").toggle(), $("#terms_plus_icon1").toggle(), $("#terms_minus_icon1").toggle()
    }), $("#app_30k").click(function() {
        $("#app_30k_holder").toggle(), $("#terms_plus_icon2").toggle(), $("#terms_minus_icon2").toggle()
    }), $("#app_50k").click(function() {
        $("#app_50k_holder").toggle(), $("#terms_plus_icon3").toggle(), $("#terms_minus_icon3").toggle()
    }), $("#winner_list1").click(function() {
        $("#winner_list1_holder").toggle(), $("#terms_plus_icon1").toggle(), $("#terms_minus_icon1").toggle()
    }), $("#winner_list2").click(function() {
        $("#winner_list2_holder").toggle(), $("#terms_plus_icon2").toggle(), $("#terms_minus_icon2").toggle()
    }), $("#winner_list3").click(function() {
        $("#winner_list3_holder").toggle(), $("#terms_plus_icon3").toggle(), $("#terms_minus_icon3").toggle()
    }), $("#winner_list4").click(function() {
        $("#winner_list4_holder").toggle(), $("#terms_plus_icon4").toggle(), $("#terms_minus_icon4").toggle()
    }), $("#winner_list5").click(function() {
        $("#winner_list5_holder").toggle(), $("#terms_plus_icon5").toggle(), $("#terms_minus_icon5").toggle()
    }), $("#winner_list6").click(function() {
        $("#winner_list6_holder").toggle(), $("#terms_plus_icon6").toggle(), $("#terms_minus_icon6").toggle()
    }), $("#winner_list7").click(function() {
        $("#winner_list7_holder").toggle(), $("#terms_plus_icon7").toggle(), $("#terms_minus_icon7").toggle()
    }), $("#winner_list8").click(function() {
        $("#winner_list8_holder").toggle(), $("#terms_plus_icon8").toggle(), $("#terms_minus_icon8").toggle()
    }), $("#winner_list9").click(function() {
        $("#winner_list9_holder").toggle(), $("#terms_plus_icon9").toggle(), $("#terms_minus_icon9").toggle()
    }), $("#winner_list10").click(function() {
        $("#winner_list10_holder").toggle(), $("#terms_plus_icon10").toggle(), $("#terms_minus_icon10").toggle()
    })
});
$(document).ready(function () {
    $('.disable_ccp').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
    $(".disable_ccp").on("contextmenu",function(e){
        return false;
    });
});
