"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var auto_complete_component_1 = require("./auto-complete/auto-complete.component");
// import { MatSelectModule } from '@angular/material';
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var autocomplete_1 = require("@angular/material/autocomplete");
var forms_1 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                auto_complete_component_1.AutoCompleteComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                form_field_1.MatFormFieldModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                autocomplete_1.MatAutocompleteModule,
                input_1.MatInputModule
            ],
            exports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                form_field_1.MatFormFieldModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                autocomplete_1.MatAutocompleteModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
