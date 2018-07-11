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
        removeOverFlow: ["Dialog"],
        svgRenderModeControls: ["Rating", "DatePicker", "RadialMenu", "RadialSlider", "Slider", "ProgressBar"],
        pluginName: {
            ProgressBar: "Progress"
        },
        autoCompleteData: [],
        renderMode: "ios7"
    };
    this._preInit = function () {
        $("a:not([noremove])").removeAttr("href");
        ej.mobile.WaitingPopup._init();
        this.model.app.css("opacity", 0);
        ej.mobile.WaitingPopup.show();
    }
    this._init = function () {
        this._hookEvent();
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
            select: "onControlListSelect",
            change: "onSearchChange",
            keyPress: "onKeyPress"
        });
    };

    this._onReady = function () {
        this.model.sbLoadedHistoryIndex = history.length;
        ej.mobile.WaitingPopup.hide();
        ej.adjustFixedElement(ejmMobileSB.prototype.model.content.addClass("e-m-" + ej.getRenderMode()));
        this.model.controlListScroll.ejmScrollPanel("refresh");
        this._loadByHash();
        this.model.app.css("opacity", "");
    };


    this._onExpandClick = function (e) {
        this.toggleLeftPane("open");
    };

    this._onCollapseClick = function (e) {
        this.toggleLeftPane("close");
    };

    this._hookEvent = function (unhook) {
        $(window).on("resize", $.proxy(this._resizeHandler, this));
        $(window).on("popstate", $.proxy(this._onSBPopState, this));
        $("#pullButton").on((ej.isDevice() ? "tap" : "click"), $.proxy(this._onExpandClick, this))
        $($.proxy(this._onReady, this));
        $(document).delegate(".products", "click", function (e) {
            viewdemo(e.target.innerHTML);
        });
        $("#Res-prodnav").on("click", function () {
            $(".product-naviation").removeClass("hideIt");
        });
        $(document).click(function (e) {
            if (!$(e.target).hasClass("productnav"))
                $(".product-naviation").addClass("hideIt");
        });

    };

    this._onSBPopState = function (e) {
        if (location.hash == "#about") {
            this.switchViewPage("about", true);
        } else if (location.hash != "") {
            if (!history.state) {
                // this._loadByHash();
            }
        } else {

            this._loadFirstControl();
        }

    };

    this._updateTabletView = function () {
        this.model.samplePage.show();
        this.model.controlList.show().ejAnimation("stop");

    };



    this._resizeHandler = function (e) {
        //resize Code
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
                this.model.pages.aboutPage.show();
                this._lastHistoryState = history.state;
                history.replaceState({}, "/", "#about");
                break;
            case "controls":
                this.model.pages.contentPage.show();
                this.model.controlList.show();
                this._setTabletView();
                break;
            default:
                curPage.show();
                break

        }

    };


    this._setTabletView = function () {
        !location.hash && this._loadFirstControl();
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
            enableAnimation: true,
        });
    };

    this.loadControl = function (url, controlName, sampleName, optionalArg) {
        App.transferPage(this.model.samplePage[0].id, url, {
            enableBrowserHistory: false,
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
    };
    this._callRenderModeLoadFunction = function (e) {
        if (typeof (window[this.model.currentControl + "RenderModeLoad"]) == "function") {
            window[this.model.currentControl + "RenderModeLoad"]();
        }
    }

    this._renderTab = function (e) {
        this.model.sampleTab.ejmTab({
            items: window.sampleItemsList,
            itemStyle: "text",
            position: "top",
            selectedItemIndex: 0,
            select: "onSubPageRender",
            cssClass: "e-m-tab-scroll"
        });
    }

    this.onViewTransfer = function (e) {
        this._finalInit({}, e);
        this.switchRenderMode(this.model.renderMode);
        this._removeOverflowSample();
    };

    this._removeOverflowSample = function () {
        if (this.model.removeOverFlow.indexOf(this.model.currentControl) != -1) {
            this.model.sampleContainer.css("overflow", "visible");
            this.model.samplePage.css("overflow", "visible");
        }
    };

    this.onViewBeforeTransfer = function (e) {
        //Sample Before Load
        this._callLoadFunction();
        if (this.model.removeOverFlow.indexOf(this.model.currentControl) != -1) {
            this.model.sampleContainer.css("overflow", "");
            this.model.samplePage.css("overflow", "");
        }
    };

    this.onAjaxSuccess = function (e) {
        //on Sample Ajax Success
    };

    this.onContentRefresh = function (e) {
        //on Content Refresh;
    };

    this.onControlViewTransfer = function (e) {
        this.model.sampleTab = $("#samplesTab");
        this.model.sampleContainer = $("#sample");
        this.model.sampleScroll = $("#appScroll");
        this.model.currentControl = e.model.customOption.control;
        this._updateHistoryState({
            targetUrl: e.model.customOption.url,
            userModel: $.extend(userModel, {
                customOption: e.model.customOption
            })
        }, this.model.currentControl, (this.model.currentControl ? "#" + this.model.currentControl.toLowerCase() : ""));
        this._renderTab(e);
    };

    this.toggleLeftPane = function (option) {
        if (!this.model.pages.contentPage.data("ejmSplitPane")) return;
        if (option == "open")
            this.model.pages.contentPage.ejmSplitPane("openLeftPane");
        if (option == "close")
            this.model.pages.contentPage.ejmSplitPane("closePane");
    };

    this.switchRenderMode = function (mode, element) {
        this.model.renderMode = mode;
        element = element ? element : $("#emulator");
        $(element).find(".e-m-ios7, .e-m-android, .e-m-windows, .e-m-flat").removeClass("e-m-ios7 e-m-android e-m-windows e-m-flat").addClass("e-m-" + mode);
        $("#emuBg").removeClass("ios7 android windows flat").addClass(mode.toLowerCase());
        if (this.model.currentControl == "Button" && this.model.currentSample == "ToggleButton") {
            $(".e-m-tbutton").ejmToggleButton("model.renderMode", mode);
        } else {
            var curControl = this.model.pluginName[this.model.currentControl];
            curControl = ej.isNullOrUndefined(curControl) ? this.model.currentControl : curControl;
            if (this.model.svgRenderModeControls.indexOf(this.model.currentControl) != -1)
                $(".e-m-" + curControl.toLowerCase())["ejm" + curControl]("option", "renderMode", mode);
        }
        if (this.model.currentControl == "DatePicker")
            $("head").attr("data-ej-mobile", true);
        else
            $("head").removeAttr("data-ej-mobile");
        $("head").removeAttr("data-ej-windows data-ej-ios7 data-ej-android data-ej-flat").attr("data-ej-" + mobileSB.model.renderMode, true);
        this._callRenderModeLoadFunction();
            this.headerTabScroll();
    };

    this.headerTabScroll = function () {
        if ($("#tabscroll").length && $("#tabscroll").ejmScrollPanel('instance')) {
            var tabScroll = $("#tabscroll").ejmScrollPanel('instance');
            var parentWidth = $("#samplesTab").parent().width();
            var scrollPosition = $("#samplesTab > li.e-m-state-active").position().left - (parentWidth / 2) + ($("#samplesTab > li.e-m-state-active").outerWidth()) / 2;
            if (scrollPosition > 0 && (scrollPosition < ($("#samplesTab").width() - parentWidth + $("#samplesTab > li.e-m-state-active").width())))
                tabScroll.scrollTo(-scrollPosition, 0);
            else if (scrollPosition < 0)
                tabScroll.scrollTo(0, 0);
            if (scrollPosition >= $("#samplesTab").width() - parentWidth)
                tabScroll.scrollTo(-($("#samplesTab").width() - parentWidth), 0);
        }
    }

}).call(ejmMobileSB.prototype);

window.mobileSB = new ejmMobileSB();


function leftPullTap(e) {
    //OPen Drawer
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
    mobileSB.headerTabScroll();
}

function onSearchButtonTap(e) {
}

function onViewTransfer(e) {
    mobileSB.onViewTransfer(e);

}

function onControlViewTransfer(e) {
    mobileSB.onControlViewTransfer(e);

}

function onViewBeforeTransfer(e) {
    mobileSB.onViewBeforeTransfer(e);
}

function onControlListSelect(e) {
    if ((mobileSB.currentControl == e.data.text && $("#sample").children().length)) return;
    mobileSB.toggleLeftPane("close");
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
function onSearchChange(e) {
    this.element.val("");
}
function onKeyPress() {
    if ($("#searchcontainer .e-m-list-wrapper").data("ejmScrollPanel"))
        $("#searchcontainer .e-m-list-wrapper").ejmScrollPanel({ enableFade: false });
}
function viewdemo(product) {
    product = product.toLowerCase();
    if (window.jsonline) {
        if (product == "mobile") return;
        else window.location.href = "http://js.syncfusion.com/demos/web/";
    } else {
        if (location.protocol == "file:" || location.toString().indexOf("sfmobilejssamplebrowser") != -1) {
            if (product == "mobile") return;
            else window.location.href = window.essentialJsUrl;
        } else {
            var text = 'StartDevServer.ashx',
                prot = window.location.protocol,
                hostname = window.location.host;
            if (product == "mobile") return;
            else product = "web";
            $.ajax({
                url: prot + "//" + hostname + "/" + text + "?product=" + product,
                success: function (data) {
                    window.location = data;
                }
            });
        }
    }
}

function switchMode(args) {
    if (mobileSB.model.renderMode != args.value)
        mobileSB.switchRenderMode(args.value);
}
