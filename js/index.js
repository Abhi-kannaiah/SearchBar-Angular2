var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Component = ng.core.Component;
var bootstrap = ng.platform.browser.bootstrap;
var client = algoliasearch('latency', '249078a3d4337a8231f1665ec5a44966');
var algoliasearchHelper = algoliasearchHelper(client, 'bestbuy', {
    disjunctiveFacets: ['category'],
    hitsPerPage: 10
});
var SearchBox = /** @class */ (function () {
    function SearchBox() {
        this.query = '';
        this.placeholder = 'Search...';
        algoliasearchHelper.setQuery(this.query).search();
    }
    SearchBox.prototype.search = function () {
        algoliasearchHelper.setQuery(this.query).search();
    };
    SearchBox = __decorate([
        Component({
            selector: 'search-box',
            template: "\n   <div class=\"form\">\n     <input \n        type=\"text\"\n        class=\"search-box\" \n        placeholder=\"{{placeholder}}\"\n        (keyup)=\"search()\"\n        [(ngModel)]=\"query\"\n     />\n    </div>\n   "
        })
    ], SearchBox);
    return SearchBox;
}());
var RefinementList = /** @class */ (function () {
    function RefinementList() {
        var _this = this;
        this.facets = [];
        algoliasearchHelper.on('result', function (results) {
            _this.facets = results.getFacetValues('category', ['selected', 'count:desc']).slice(0, 5);
        });
    }
    RefinementList.prototype.toggleFacet = function (facetName) {
        algoliasearchHelper.toggleRefinement('category', facetName).search();
    };
    RefinementList = __decorate([
        Component({
            selector: 'refinement-list',
            template: "\n    <ul class=\"facet-list\" [class.no-results]=\"facets.length === 0\">\n      <li \n        *ngFor=\"let facet of facets\"\n        [class.active]=\"facet.isRefined\"\n        (click)=\"toggleFacet(facet.name)\"\n      >\n        <input type=\"checkbox\" [name]=\"facet.name\"/>\n        {{facet.name}}\n        <span class=\"badge\">{{facet.count}}</span>\n      </li>\n      <li *ngIf=\"facets.length === 0\">No results.</li>\n    </ul>\n  "
        })
    ], RefinementList);
    return RefinementList;
}());
var Results = /** @class */ (function () {
    function Results() {
        var _this = this;
        this.hits = [];
        algoliasearchHelper.on('result', function (results) {
            _this.hits = results.hits;
        });
    }
    Results = __decorate([
        Component({
            selector: 'results',
            template: "\n    <div class=\"results\">\n      <div *ngFor=\"let hit of hits\" \n        class=\"list-group-item\" \n        [innerHTML]=\"hit._highlightResult.name.value\"\n      >\n      crap\n      </div>\n    </div>\n  "
        })
    ], Results);
    return Results;
}());
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Component({
            selector: 'my-app',
            directives: [SearchBox, RefinementList, Results],
            template: "\n    <div class=\"app\">\n      <h1>Search</h1>\n      <search-box></search-box>\n      <refinement-list></refinement-list>\n      <results></results>\n    </div>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());
bootstrap(AppComponent);