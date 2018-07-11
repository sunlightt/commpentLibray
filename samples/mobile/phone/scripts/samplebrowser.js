var ejmMobileSB = ejmMobileSB || {};

(function renderSampleList(sampleListName, target) {
    var eleString = "";
    if (sampleListName && typeof sampleListName === "object" && sampleListName.length) {
        $.each(sampleListName, function (index, vlaueObject) {
            eleString += '<ul id="' + window.sampleslist[index].CategoryId +
                'ListView" data-role="ejmlistview" data-ej-windows-preventskew="true" data-ej-datasource="window.sampleslist[' + index + '].CategoryItem" data-ej-fields-text="text" data-ej-templateid="ctrl-list-template" data-ej-query="ej.Query()" data-ej-select="onControlListSelect" listviewindex=' + index + '></ul>';
        });
    }
    if (target) $(target).append(eleString);
    return eleString;
})(window.sampleslist, "#appList");

//Js renderHelper
$.views.helpers({
    toLowerCase: function (str) {
        return str.toLowerCase();
    },
    toUpperCase: function (str) {
        return str.toUpperCase();
    }
});


//SampleBrowserPlugin
ejmMobileSB = function (args) {
    this._preInit();
    this._init();
};


(function () {
    var _offHistoryIni = null,
        _firstPageSate = null;
    var _browserWidth = window.innerWidth;
    var userModel = {
        enableAnimation: false,
        viewTransfered: "onControlViewTransfer",
    };
    this.model = {
        app: $(document.body),
        controlList: $("#appList"),
        splitPane: $("#splitView"),
        content: $("#appContent"),
        pages: {
            contentPage: $("#contentPage"),
            aboutPage: $("#aboutPage")
        },
        controlListScroll: $("#appListScroll"),
        sampleScroll: $("#appScroll"),
        samplePage: $("#sampleViewer"),
        sampleContainer: $("#sample"),
        selectedTabIndex: 0,
        sbLoadedHistoryIndex: null,
        searchIcon: $("#searchicon"),
        sampleTabScrollControl: ["BarCode", "Chart", "Button", "DropDownList", "ListView"],
        lastViewMode: ej.isLowerResolution(),
        autoCompleteData: []
    };
    this._preInit = function () {
        $("a").removeAttr("href");
        ej.mobile.WaitingPopup._init();
        this.model.app.css("opacity", 0);
        ej.mobile.WaitingPopup.show();
    }
    this._init = function () {
        this._hookEvent();
        this._renderSubSplitPane();
        this._setAutoCompleteData();
        this._renderSearchBox();
    };
    this._loadByHash = function () {
        this.model.controlList.css("opacity", "");
        switch (location.hash) {
            case "#about":
                this.switchViewPage("about");
                break;
            case "":
                this.switchViewPage("controls", true);
                break;
            default:
                var proxy = this,
                    control;
                $.each(window.sampleslist, function (index, subObj) {
                    control = proxy._getSampleIndex(subObj.CategoryItem, location.hash.split('/')[0].replace('#', ''));
                    if (control != -1) {
                        proxy.CategoryIndex = index;
                        proxy.controlIndex = control;
                    }
                });
                if (this.controlIndex != -1 && !ej.isNullOrUndefined(this.controlIndex)) {
                    var targetList = window.sampleslist[this.CategoryIndex],
                        _curControl = targetList.CategoryItem[this.controlIndex].text,
                        _curListId = window.sampleslist[this.CategoryIndex].href;
                    var _curSate = {
                        targetUrl: targetList.CategoryItem[this.controlIndex].Url,
                        userModel: $.extend(userModel, {
                            customOption: {
                                catIndex: this.CategoryIndex,
                                sampleIndex: 0,
                                control: _curControl
                            }
                        }),
                    };
                    this._updateHistoryState(_curSate, _curControl, (_curControl ? "#" + _curControl.toLowerCase() : ""));
                    $(_curListId).ejmListView("selectItemByIndex", this.controlIndex);
                }
        }

    }

    this._updateHistoryState = function (stateObj, control, hash, isFirstPage) {
        $.extend(stateObj, {
            target: "sampleViewer",
            targetContent: "",
            firstPage: isFirstPage
        });
        history.replaceState(stateObj, control, hash);
    }

    this._loadFirstControl = function () {
        var stObj = {
            targetUrl: "chart.htm",
            userModel: $.extend(userModel, {
                customOption: {
                    catIndex: 0,
                    sampleIndex: 0,
                    control: "Chart"
                }
            })
        }
        this._updateHistoryState(stObj, "Chart", "#chart", true);
        this.model.controlList.find(".e-m-lv.e-js").first().ejmListView("selectItemByIndex", 0);
    }

    this._removeCurState = function (firstPage) {
        history.replaceState({
            firstPage: firstPage
        }, location.pathname, location.pathname);
    }

    this._initSamplePage = function () {
        var hash = [];
        if (location.hash !== "")
            hash = location.hash.replace("#", "").split("/");
        if (hash.length == 2 && sampleItemsList) {
            this.model.selectedTabIndex = this._getSampleIndex(sampleItemsList, hash[1]);
            this.model.selectedTabIndex = (this.model.selectedTabIndex === -1 ? 0 : this.model.selectedTabIndex);
        }
        this.model.sampleTab.ejmTab("setActiveItem", this.model.selectedTabIndex);
    };

    this._setAutoCompleteData = function () {
        var i, j, k;
        for (i = 0; i < sampleslist.length; i++) {
            for (j = 0; j < sampleslist[i].CategoryItem.length; j++) {
                if (!ej.isNullOrUndefined(sampleslist[i].CategoryItem[j].samples) && sampleslist[i].CategoryItem[j].samples.length > -1)
                    var newProp = {},
                        prop = sampleslist[i].CategoryItem[j];
                newProp = {
                    text: sampleslist[i].CategoryItem[j].text,
                    tag: sampleslist[i].CategoryItem[j].tag,
                    Url: sampleslist[i].CategoryItem[j].Url,
                    categoryIndex: i,
                    sampleIndex: j
                };
                this.model.autoCompleteData.push(newProp);
            }
        }
    };

    this._renderSearchBox = function () {
        $("#search-ac").ejmAutocomplete({
            watermarkText: "Search a control",
            fields: {
                text: "text"
            },
            query: "ej.Query()",
            mode: "search",
            dataSource: this.model.autoCompleteData,
            select: "onControlListSelect"
        });
    };

    this._modeStateMaintain = function () {
        if (ej.isLowerResolution()) {
            this._removeCurState(true);
            this._setPhoneView();
        } else
            this._setTabletView();
    };

    this._onReady = function () {
        this.model.sbLoadedHistoryIndex = history.length;
        ej.mobile.WaitingPopup.hide();
        ej.adjustFixedElement(ejmMobileSB.prototype.model.content.addClass("e-m-" + ej.getRenderMode()));
        this.model.controlListScroll.ejmScrollPanel("refresh");
        this._loadByHash();
        this.model.app.css("opacity", "");
    };

    this._onSBClick = function (e) {
        if (!($(e.target).hasClass("ac-search") || $(e.target).hasClass("e-m-icon-close"))) {
            $("#search-ac_wrapper").hide();
            if (location.hash == "" || (!ej.isLowerResolution() && location.hash != "#about"))
                this.model.searchIcon.show();
        }
    };

    this._hookEvent = function (unhook) {
        $(window).on("resize", $.proxy(this._resizeHandler, this));
        $(window).on("popstate", $.proxy(this._onSBPopState, this));
        $($.proxy(this._onReady, this));
        this.model.splitPane.on((ej.isDevice() ? "tap" : "click"), $.proxy(this._onSBClick, this));
    };

    this._onSBPopState = function (e) {
        if (location.hash == "#about") {
            this.switchViewPage("about", true);
        } else if (location.hash != "") {
            if (!history.state) {
                // this._loadByHash();
            }
        } else {
            if (ej.isLowerResolution()) {
                this.model.currentControl = this.model.currentSample = "";
                this._updateAppBar();
                this._updatePhoneBackView();
            } else {
                this._loadFirstControl();
            }
        }

    };

    this._updatePhoneBackView = function () {
        if (ej.isLowerResolution()) {
            if (location.hash == "") {
                if (this.model.controlList.is(":visible")) return;
                this.model.samplePage.hide().html("");
                this.model.searchIcon.show();
                this.model.controlList.addClass("page").show().ejAnimation("slideLeftIn", 300, "ease").done($.proxy(function (e) {
                    this.model.controlList.removeClass("page");
                    ej.mobile.WaitingPopup.hide();
                }, this));
            } else {
                this.model.controlList.addClass("page").ejAnimation("slideLeftOut", 300, "ease").done($.proxy(function (evt) {
                    this.model.controlList.removeClass("page");
                    if (ej.isLowerResolution()) {
                        this.model.controlList.hide();
                        this.model.samplePage.show();
                        this.model.searchIcon.hide();
                    }
                }, this));
            }
        }
    };

    this._updateTabletView = function () {
        if (!ej.isLowerResolution()) {
            this.model.samplePage.show();
            this.model.searchIcon.show();
            this.model.controlList.show().ejAnimation("stop");
        }
    };

    this._updateAppBar = function () {
        if (!ej.isLowerResolution()) {
            $("#leftMenuBut").ejmActionlink("option", "imageClass", "button-icon e-m-sbicon-drawermenu");
        } else {
            if (location.hash != "" && location.hash != "#about")
                $("#leftMenuBut").ejmActionlink("option", "imageClass", "button-icon e-m-sbicon-back");
            else
                $("#leftMenuBut").ejmActionlink("option", "imageClass", "button-icon e-m-sbicon-drawermenu");
        }
    };

    this._resizeHandler = function (e) {
        if (_browserWidth != window.innerWidth) {
            this._renderSubSplitPane();
            if (this.model.lastViewMode != ej.isLowerResolution()) this._modeStateMaintain();
            this._updateAppBar();
            this._updateTabletView();
        }
        this.model.lastViewMode = ej.isLowerResolution();
        _browserWidth = window.innerWidth;
    };

    this._renderSubSplitPane = function (e) {

        if (!ej.isLowerResolution() && this.model.pages.contentPage.data("ejmSplitPane") == undefined) {
            this.model.samplePage.show();
            this.model.controlList.show();
            this.model.searchIcon.show();
            this.model.pages.contentPage.ejmSplitPane({
                leftPane: {
                    templateId: this.model.controlList[0].id,
                },
                contentPane: {
                    templateId: this.model.samplePage[0].id,
                },
                enableSwipe: false
            });
        }
        if (ej.isLowerResolution() && this.model.pages.contentPage.data("ejmSplitPane")) {
            this.model.pages.contentPage.ejmSplitPane("destroy");
            if (location.hash != "") {
                this.model.controlList.hide();
                this.model.searchIcon.hide();
            } else {
                this.model.samplePage.hide();
            }
        }
    };

    this._getSampleIndex = function (list, key) {
        var query = ej.Query().using(ej.DataManager(list)).where("text", "==", key, true),
            res;
        res = query.executeLocal();
        return res.length == 0 ? -1 : ($(list).index($(res)));
    };

    this._finalInit = function (model, e) {
        this._setSampleScrollHeight(model);
    };

    this._setSampleScrollHeight = function (model) {
        if (!model.disableScrollPanel && !this.model.sampleScroll.data("ejmScrollPanel"))
            $(this.model.sampleScroll.selector).ejmScrollPanel({});
    };

    this.switchViewPage = function (page, firstPage) {
        var curPage = this.model.content.find(".sbpage").is(":visible")
        this.model.content.find(".sbpage").hide();
        firstPage = firstPage ? true : false;
        switch (page) {
            case "about":
                this.model.searchIcon.hide();
                this.model.pages.aboutPage.show();
                this._lastHistoryState = history.state;
                history.replaceState({}, "/", "#about");
                break;
            case "controls":
                this.model.searchIcon.show();
                this.model.pages.contentPage.show();
                this.model.controlList.show();
                this["_set" + (ej.isLowerResolution() ? "Phone" : "Tablet") + "View"]();
                break;
            default:
                curPage.show();
                break

        }

    };

    this._setPhoneView = function () {
        if (!location.hash) {
            this.model.samplePage.hide().children().remove();
            this.model.controlList.show();
        }

    }

    this._setTabletView = function () {
        !location.hash && this._loadFirstControl();
    }

    this._transferPhoneControlPage = function (e) {
        if (!ej.isLowerResolution()) return;
        var evt = e;
        this.model.controlList.addClass("page").ejAnimation("slideLeftOut", 300, "ease");
        this.model.samplePage.addClass("page").show().ejAnimation("slideRightIn", 300, "ease").done($.proxy(function (e) {
            this.model.searchIcon.hide();
            this.model.controlList.removeClass("page").hide();
            this._updateAppBar();
            this._renderTab(evt);
            this._callLoadFunction();
        }, this));
    }

    this.refreshControlListScroll = function () {
        this.model.controlListScroll.ejmScrollPanel("refresh");
    };

    this.loadSample = function (url, controlName, sampleName, optionalArg) {
        if (this.model.sampleScroll.length && this.model.sampleScroll.data("ejmScrollPanel"))
            this.model.sampleScroll.ejmScrollPanel("scrollTo", 0, 0);
        App.transferPage("sample", url, {
            enableBrowserHistory: false,
            toPageClass: "sample-page " + controlName + " " + sampleName,
            viewTransfered: "onViewTransfer",
            viewBeforeTransfer: "onViewBeforeTransfer",
            customOption: optionalArg,
            enableCache: false,
            enableAnimation: (ej.isLowerResolution() && location.hash != "") || (!ej.isLowerResolution()),
        });
    };

    this.loadControl = function (url, controlName, sampleName, optionalArg) {
        App.transferPage(this.model.samplePage[0].id, url, {
            enableBrowserHistory: (ej.isLowerResolution()),
            enableAnimation: false,
            forceHash: true,
            enableCache: false,
            hashValue: controlName.toLowerCase(),
            toPageClass: "control-page " + optionalArg.control,
            viewTransfered: "onControlViewTransfer",
            ajaxSuccess: "onAjaxSuccess",
            refreshed: "onContentRefresh",
            customOption: optionalArg
        });
    };

    this._callLoadFunction = function (e) {
        if (typeof (window[this.model.currentControl + "Load"]) == "function") {
            window[this.model.currentControl + "Load"]();
        }
    }

    this._renderTab = function (e) {
        this.model.sampleTab.ejmTab({
            items: window.sampleItemsList,
            itemStyle: "text",
            position: "top",
            selectedItemIndex: 0,
            select: "onSubPageRender",
            cssClass: (this.model.sampleTabScrollControl.indexOf((this.model.currentControl)) != -1 ? "e-m-tab-scroll" : "")
        });
    }

    this.onViewTransfer = function (e) {
        this._finalInit({}, e);
        this._callLoadFunction();
    };

    this.onViewBeforeTransfer = function (e) {
        //Sample Before Load
    };

    this.onAjaxSuccess = function (e) {
        this._transferPhoneControlPage(e);
    };

    this.onContentRefresh = function (e) {
        //this._renderTab(e);
    };

    this.onControlViewTransfer = function (e) {
        this.model.sampleTab = $("#samplesTab");
        this.model.sampleContainer = $("#sample");
        this.model.sampleScroll = $("#appScroll");
        $("#search-ac_wrapper").hide();
        this.model.currentControl = e.model.customOption.control;
        if (!ej.isLowerResolution()) {
            this._updateHistoryState({
                targetUrl: e.model.customOption.url,
                userModel: $.extend(userModel, {
                    customOption: e.model.customOption
                })
            }, this.model.currentControl, (this.model.currentControl ? "#" + this.model.currentControl.toLowerCase() : ""));
            this._renderTab(e);
        }
    };

    this.toggleLeftPane = function (option) {
        if (!this.model.splitPane.data("ejmSplitPane")) return;
        if (option == "open")
            this.model.splitPane.ejmSplitPane("openLeftPane");
        if (option == "close")
            this.model.splitPane.ejmSplitPane("closePane");
    };

}).call(ejmMobileSB.prototype);

window.mobileSB = new ejmMobileSB();

function onLeftButtonTap(e) {

    if (ej.isLowerResolution() && location.hash != "#about" && location.hash) {
        history.back();
        //Since i used the setTimeOut on Device browser back page should wait 100ms(Browser View navigation time)
        setTimeout(function () {
            mobileSB._modeStateMaintain();
            mobileSB._updateAppBar();
            mobileSB.model.samplePage.html("");
        }, 100);

    } else
        mobileSB.toggleLeftPane("open");
}

function onAccSizeChange(e) {
    mobileSB.refreshControlListScroll();
}

function onAjaxSuccess(e) {
    mobileSB.onAjaxSuccess(e);
}

function onContentRefresh(e) {
    mobileSB.onContentRefresh(e);
}

function onSubPageRender(e) {
    if (!mobileSB.model.samplePage.find("[data-url='" + e.model.items[e.index].url + "']").length)
        mobileSB.loadSample(e.model.items[e.index].url, e.model.items[e.index].control, e.text.toLowerCase(), {
            tabIndex: e.index
        });
    mobileSB.model.currentControl = e.model.items[e.index].control;
    mobileSB.model.currentSample = e.text;
    if ($("#tabscroll").length && $("#tabscroll").ejmScrollPanel('instance')) {
        var tabScroll = $("#tabscroll").ejmScrollPanel('instance');
        var parentWidth = $("#samplesTab").parent().width();
        var scrollPosition = e.item.position().left - (parentWidth / 2) + (e.item.outerWidth()) / 2;
        if (scrollPosition > 0 && (scrollPosition < ($("#samplesTab").width() - parentWidth + e.item.width())))
            tabScroll.scrollTo(-scrollPosition, 0);
        else if (scrollPosition < 0)
            tabScroll.scrollTo(0, 0);
        if (scrollPosition >= $("#samplesTab").width() - parentWidth && !(!ej.isMobile() && ej.isWindows()))
            tabScroll.scrollTo(-($("#samplesTab").width() - parentWidth), 0);
    }
}

function onSearchButtonTap(e) {
    mobileSB.model.searchIcon.hide();
    $("#search-ac_wrapper").show();
}

function onViewTransfer(e) {
    mobileSB.onViewTransfer(e);
}

function onControlViewTransfer(e) {
    mobileSB.onControlViewTransfer(e);
}

function onBeforeViewTransfer(e) {
    mobileSB.onViewBeforeTransfer(e);
}

function onControlListSelect(e) {
    if ((mobileSB.currentControl == e.data.text && $("#sample").children().length) || ($("#search-ac_wrapper").is(":visible") && this.pluginName.toLowerCase() == "ejmlistview")) return;
    var catIndex = (e.data && !ej.isNullOrUndefined(e.data.categoryIndex) ? e.data.categoryIndex : parseInt(e.item.parent().attr("listviewindex"))),
        sampleIndex = (e.data && !ej.isNullOrUndefined(e.data.sampleIndex) ? e.data.sampleIndex : e.index);
    window.sampleItemsList = window.sampleslist[catIndex].CategoryItem[sampleIndex].samples;
    mobileSB.loadControl(e.data.Url, e.data.text, "", {
        sampleIndex: sampleIndex,
        catIndex: catIndex,
        control: e.data.text,
        url: e.data.Url
    });
    mobileSB.currentControl = e.data.text;
    this.pluginName.toLowerCase() == "ejmautocomplete" && this.clearText();
    $("#controlList").find('ul li').removeClass("e-m-lv-active");
    e.item.addClass("e-m-lv-active");
}

function onNavListSelect(e) {
    if (e.event) {
        mobileSB._removeCurState();
        mobileSB.switchViewPage(e.data.text.toLocaleLowerCase());
        mobileSB.toggleLeftPane("close");
    }
}