---
title: "Parameter Tables"
pagefind: true
---

``` r
library(hyperion)
#> 
#> 
#> ── pharos configuration ────────────────────────────────────────────────────────
#> ✔ pharos.toml found: /Users/mattsmith/Documents/hyperion.tables/vignettes/pharos.toml
#> ── hyperion options ────────────────────────────────────────────────────────────
#> ✔ hyperion.significant_number_display : 4
#> ── hyperion nonmem object options ──────────────────────────────────────────────
#> ✔ hyperion.nonmem_model.show_included_columns : FALSE
#> ✔ hyperion.nonmem_summary.rse_threshold : 50
#> ✔ hyperion.nonmem_summary.shrinkage_threshold : 30
library(hyperion.tables)

library(gt)
library(flextable)

model_dir <- system.file("extdata", "models", "onecmt", package = "hyperion.tables")
model_run <- "run003"
```

``` r
spec <- TableSpec() |>
  set_spec_transforms(omega = "cv") |>
  set_spec_sections(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual error",
    TRUE ~ "Other"
  ) |>
  set_spec_parameter_names(source = "display") |>
  set_spec_title(paste(model_run, "Parameters"))

mod <- read_model(file.path(model_dir, paste0(model_run, ".mod")))

info <- get_model_parameter_info(
    mod,
  system.file("lookup.toml", package = "hyperion.tables")
)

info <- info |> 
  update_param_info("SIGMA(2,2)", parameterization = "AddErr")

mod_sum <- summary(mod)

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-2-1.png)

## Changing display names with `set_spec_parameter_names()`

``` r
spec <- spec |> set_spec_parameter_names(source = "display")

info <- info |>
    update_param_info("SIGMA(1,1)", display = "Proportional Error") |>
  update_param_info("SIGMA(2,2)", display = "Additive Error")

mod_sum <- summary(mod)

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-3-1.png)

``` r
spec <- spec |> set_spec_parameter_names(source = "nonmem")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-4-1.png)

### Adding descriptions with `add_spec_columns()`

``` r
spec <- spec |>
  set_spec_parameter_names(source = "display") |>
  add_spec_columns("description")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-5-1.png)

### Removing columns with `drop_spec_columns()`

``` r
## Start fresh to demonstrate drop_columns
spec <- TableSpec() |>
  set_spec_transforms(omega = "cv") |>
  set_spec_sections(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual error",
    TRUE ~ "Other"
  ) |>
  set_spec_parameter_names(source = "display") |>
  drop_spec_columns("unit")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |> 
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-6-1.png)

``` r
## Drop multiple columns
spec <- spec |> drop_spec_columns("shrinkage")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-7-1.png)

## Structural parameters only

``` r
sp_spec <- TableSpec() |>
  set_spec_sections(
    kind == "THETA" ~ "Structural model parameters",
    TRUE ~ "Other"
  ) |>
  set_spec_filter(kind == "THETA") |>
  drop_spec_columns("shrinkage")

get_parameters(mod) |>
  apply_table_spec(sp_spec, info) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-8-1.png)

## Random Effect Parameters only

``` r
re_spec <- TableSpec() |>
  set_spec_sections(
    kind == "OMEGA" ~ "Random Effect Parameters",
    kind == "SIGMA" ~ "Residual Error",
    TRUE ~ "Other"
  ) |>
  set_spec_filter(kind != "THETA") |>
  drop_spec_columns("unit")

get_parameters(mod) |>
  apply_table_spec(re_spec, info) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-9-1.png)

## Confidence Interval level

``` r
spec <- TableSpec() |>
  set_spec_transforms(omega = "cv") |>
  set_spec_sections(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual variance",
    TRUE ~ "Other"
  ) |>
  set_spec_ci(level = 0.7) |>
  set_spec_sigfig(3)

mod_sum <- summary(mod)
info <- get_model_parameter_info(mod)

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-10-1.png)

## Changing summary info shown

``` r
spec <- TableSpec() |>
  set_spec_transforms(omega = "cv") |>
  set_spec_sections(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual variance",
    TRUE ~ "Other"
  ) |>
  set_spec_ci(level = 0.7) |>
  set_spec_sigfig(3) |>
  set_spec_parameter_names(source = "display")

mod_sum <- summary(mod)
info <- get_model_parameter_info(mod, lookup_path = normalizePath("../inst/lookup.toml"))

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum, show_cond_num = FALSE) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-11-1.png)

``` r
get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum, show_cond_num = FALSE, show_ofv = FALSE) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-12-1.png)

``` r
get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum, show_method = FALSE) |>
  make_parameter_table() |>
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-13-1.png)

## Transformation Reference

The following table shows how CV, RSE, and CI are computed for each
transform and parameter type combination.

<div id="qtameqyqud" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#qtameqyqud table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#qtameqyqud thead, #qtameqyqud tbody, #qtameqyqud tfoot, #qtameqyqud tr, #qtameqyqud td, #qtameqyqud th {
  border-style: none;
}
&#10;#qtameqyqud p {
  margin: 0;
  padding: 0;
}
&#10;#qtameqyqud .gt_table {
  display: table;
  border-collapse: collapse;
  line-height: normal;
  margin-left: auto;
  margin-right: auto;
  color: #333333;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  background-color: #FFFFFF;
  width: auto;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #A8A8A8;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #A8A8A8;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#qtameqyqud .gt_title {
  color: #333333;
  font-size: 125%;
  font-weight: initial;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-color: #FFFFFF;
  border-bottom-width: 0;
}
&#10;#qtameqyqud .gt_subtitle {
  color: #333333;
  font-size: 85%;
  font-weight: initial;
  padding-top: 3px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-color: #FFFFFF;
  border-top-width: 0;
}
&#10;#qtameqyqud .gt_heading {
  background-color: #FFFFFF;
  text-align: center;
  border-bottom-color: #FFFFFF;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_col_headings {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_col_heading {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  overflow-x: hidden;
}
&#10;#qtameqyqud .gt_column_spanner_outer {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: normal;
  text-transform: inherit;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 4px;
  padding-right: 4px;
}
&#10;#qtameqyqud .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#qtameqyqud .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#qtameqyqud .gt_column_spanner {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow-x: hidden;
  display: inline-block;
  width: 100%;
}
&#10;#qtameqyqud .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#qtameqyqud .gt_group_heading {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  text-align: left;
}
&#10;#qtameqyqud .gt_empty_group_heading {
  padding: 0.5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: middle;
}
&#10;#qtameqyqud .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#qtameqyqud .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#qtameqyqud .gt_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 10px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  overflow-x: hidden;
}
&#10;#qtameqyqud .gt_stub {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qtameqyqud .gt_stub_row_group {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
  vertical-align: top;
}
&#10;#qtameqyqud .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#qtameqyqud .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#qtameqyqud .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qtameqyqud .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#qtameqyqud .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qtameqyqud .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#qtameqyqud .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_footnotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qtameqyqud .gt_sourcenotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}
&#10;#qtameqyqud .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qtameqyqud .gt_left {
  text-align: left;
}
&#10;#qtameqyqud .gt_center {
  text-align: center;
}
&#10;#qtameqyqud .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#qtameqyqud .gt_font_normal {
  font-weight: normal;
}
&#10;#qtameqyqud .gt_font_bold {
  font-weight: bold;
}
&#10;#qtameqyqud .gt_font_italic {
  font-style: italic;
}
&#10;#qtameqyqud .gt_super {
  font-size: 65%;
}
&#10;#qtameqyqud .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#qtameqyqud .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#qtameqyqud .gt_indent_1 {
  text-indent: 5px;
}
&#10;#qtameqyqud .gt_indent_2 {
  text-indent: 10px;
}
&#10;#qtameqyqud .gt_indent_3 {
  text-indent: 15px;
}
&#10;#qtameqyqud .gt_indent_4 {
  text-indent: 20px;
}
&#10;#qtameqyqud .gt_indent_5 {
  text-indent: 25px;
}
&#10;#qtameqyqud .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#qtameqyqud div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="5" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Transformation Formulas</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="a::stub"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="parameter">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="cv">CV</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE<span class="gt_footnote_marks" style="white-space:nowrap;font-style:italic;font-weight:normal;line-height:0;"><sup>1</sup></span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci">CI<span class="gt_footnote_marks" style="white-space:nowrap;font-style:italic;font-weight:normal;line-height:0;"><sup>2</sup></span></th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_row_group_first"><td headers="Identity stub_2_1 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">Identity</td>
<td headers="Identity stub_2_1 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="Identity stub_2_1 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Identity stub_2_1 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Identity stub_2_1 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Identity stub_2_2 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="Identity stub_2_2 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Identity stub_2_2 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Identity stub_2_2 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Identity stub_2_3 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="Identity stub_2_3 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Identity stub_2_3 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Identity stub_2_3 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_row_group_first"><td headers="LogNormal stub_2_4 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">LogNormal</td>
<td headers="LogNormal stub_2_4 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="LogNormal stub_2_4 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="LogNormal stub_2_4 rse" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msup><mtext>SE</mtext><mn>2</mn></msup><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\text{SE}^2) - 1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.84em;vertical-align:-0.5363em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3037em;"><span class="svg-align" style="top:-3.8em;"><span class="pstrut" style="height:3.8em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord text"><span class="mord">SE</span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8873em;"><span style="top:-3.1362em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-3.2637em;"><span class="pstrut" style="height:3.8em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.88em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.88em' viewBox='0 0 400000 1944' preserveAspectRatio='xMinYMin slice'><path d='M983 90
l0 -0
c4,-6.7,10,-10,18,-10 H400000v40
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.5363em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="LogNormal stub_2_4 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\text{Est} \pm z \cdot \text{SE})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4445em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">SE</span></span><span class="mclose">)</span></span></span></span></span></td></tr>
    <tr><td headers="LogNormal stub_2_5 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="LogNormal stub_2_5 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\text{Est}) - 1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="LogNormal stub_2_5 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="LogNormal stub_2_5 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\text{Est} \pm z \cdot \text{SE})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4445em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">SE</span></span><span class="mclose">)</span></span></span></span></span></td></tr>
    <tr><td headers="LogNormal stub_2_6 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="LogNormal stub_2_6 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\text{Est}) - 1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="LogNormal stub_2_6 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="LogNormal stub_2_6 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\text{Est} \pm z \cdot \text{SE})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4445em;"></span><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">SE</span></span><span class="mclose">)</span></span></span></span></span></td></tr>
    <tr class="gt_row_group_first"><td headers="Logit stub_2_7 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">Logit</td>
<td headers="Logit stub_2_7 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="Logit stub_2_7 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Logit stub_2_7 rse" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mtext>BT</mtext><mo stretchy="false">)</mo><mo>⋅</mo><mtext>SE</mtext></mrow><annotation encoding="application/x-tex">(1 - \text{BT}) \cdot \text{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord text"><span class="mord">BT</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord text"><span class="mord">SE</span></span></span></span></span></span></td>
<td headers="Logit stub_2_7 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mo>−</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + \exp(-(\text{Est} \pm z \cdot \text{SE}))}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3651em;vertical-align:-0.52em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span><span class="mbin mtight">+</span><span class="mop mtight"><span class="mtight">e</span><span class="mtight">x</span><span class="mtight">p</span></span><span class="mopen mtight">(</span><span class="mord mtight">−</span><span class="mopen mtight">(</span><span class="mord text mtight"><span class="mord mtight">Est</span></span><span class="mbin mtight">±</span><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span><span class="mbin mtight">⋅</span><span class="mord text mtight"><span class="mord mtight">SE</span></span><span class="mclose mtight">))</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.52em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></td></tr>
    <tr><td headers="Logit stub_2_8 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="Logit stub_2_8 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Logit stub_2_8 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Logit stub_2_8 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mo>−</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + \exp(-(\text{Est} \pm z \cdot \text{SE}))}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3651em;vertical-align:-0.52em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span><span class="mbin mtight">+</span><span class="mop mtight"><span class="mtight">e</span><span class="mtight">x</span><span class="mtight">p</span></span><span class="mopen mtight">(</span><span class="mord mtight">−</span><span class="mopen mtight">(</span><span class="mord text mtight"><span class="mord mtight">Est</span></span><span class="mbin mtight">±</span><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span><span class="mbin mtight">⋅</span><span class="mord text mtight"><span class="mord mtight">SE</span></span><span class="mclose mtight">))</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.52em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></td></tr>
    <tr><td headers="Logit stub_2_9 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="Logit stub_2_9 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Logit stub_2_9 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Logit stub_2_9 ci" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mo>−</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo>±</mo><mi>z</mi><mo>⋅</mo><mtext>SE</mtext><mo stretchy="false">)</mo><mo stretchy="false">)</mo></mrow></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{1 + \exp(-(\text{Est} \pm z \cdot \text{SE}))}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3651em;vertical-align:-0.52em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span><span class="mbin mtight">+</span><span class="mop mtight"><span class="mtight">e</span><span class="mtight">x</span><span class="mtight">p</span></span><span class="mopen mtight">(</span><span class="mord mtight">−</span><span class="mopen mtight">(</span><span class="mord text mtight"><span class="mord mtight">Est</span></span><span class="mbin mtight">±</span><span class="mord mathnormal mtight" style="margin-right:0.04398em;">z</span><span class="mbin mtight">⋅</span><span class="mord text mtight"><span class="mord mtight">SE</span></span><span class="mclose mtight">))</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.52em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></td></tr>
    <tr class="gt_row_group_first"><td headers="Proportional stub_2_10 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">Proportional</td>
<td headers="Proportional stub_2_10 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="Proportional stub_2_10 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="Proportional stub_2_10 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Proportional stub_2_10 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Proportional stub_2_11 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="Proportional stub_2_11 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mtext>Est</mtext></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\text{Est}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord text"><span class="mord">Est</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="Proportional stub_2_11 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Proportional stub_2_11 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Proportional stub_2_12 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="Proportional stub_2_12 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mtext>Est</mtext></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\text{Est}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord text"><span class="mord">Est</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="Proportional stub_2_12 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Proportional stub_2_12 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_row_group_first"><td headers="AddErr stub_2_13 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">AddErr</td>
<td headers="AddErr stub_2_13 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="AddErr stub_2_13 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="AddErr stub_2_13 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="AddErr stub_2_13 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="AddErr stub_2_14 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="AddErr stub_2_14 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="AddErr stub_2_14 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="AddErr stub_2_14 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="AddErr stub_2_15 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="AddErr stub_2_15 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="AddErr stub_2_15 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="AddErr stub_2_15 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_row_group_first"><td headers="LogAddErr stub_2_16 stub_1" rowspan="3" class="gt_row gt_left gt_stub_row_group" style="font-weight: bold;">LogAddErr</td>
<td headers="LogAddErr stub_2_16 parameter" class="gt_row gt_left"><span class='gt_from_md'>Theta</span></td>
<td headers="LogAddErr stub_2_16 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msup><mtext>Est</mtext><mn>2</mn></msup><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\text{Est}^2) - 1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.84em;vertical-align:-0.5363em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3037em;"><span class="svg-align" style="top:-3.8em;"><span class="pstrut" style="height:3.8em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord text"><span class="mord">Est</span></span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8873em;"><span style="top:-3.1362em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-3.2637em;"><span class="pstrut" style="height:3.8em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.88em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.88em' viewBox='0 0 400000 1944' preserveAspectRatio='xMinYMin slice'><path d='M983 90
l0 -0
c4,-6.7,10,-10,18,-10 H400000v40
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.5363em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="LogAddErr stub_2_16 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="LogAddErr stub_2_16 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="LogAddErr stub_2_17 parameter" class="gt_row gt_left"><span class='gt_from_md'>Omega</span></td>
<td headers="LogAddErr stub_2_17 cv" class="gt_row gt_left"><span class='gt_from_md'>N/A</span></td>
<td headers="LogAddErr stub_2_17 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="LogAddErr stub_2_17 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="LogAddErr stub_2_18 parameter" class="gt_row gt_left"><span class='gt_from_md'>Sigma</span></td>
<td headers="LogAddErr stub_2_18 cv" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mtext>Est</mtext><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\text{Est}) - 1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord text"><span class="mord">Est</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span></span></span></span></span></td>
<td headers="LogAddErr stub_2_18 rse" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="LogAddErr stub_2_18 ci" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"> Est = THETA(x)/OMEGA(i,j)/SIGMA(i,j) reported in the .ext file</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"> BT = back-transformed estimate = 1/(1 + exp(-Est))</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"> SE = Standard Error, z = z-score for CI level</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"> CV and RSE formulas are multiplied by 100 to express as percentages</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"><span class="gt_footnote_marks" style="white-space:nowrap;font-style:italic;font-weight:normal;line-height:0;"><sup>1</sup></span> SE/|Est| unless otherwise noted</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="5"><span class="gt_footnote_marks" style="white-space:nowrap;font-style:italic;font-weight:normal;line-height:0;"><sup>2</sup></span> Est ± z·SE unless otherwise noted</td>
    </tr>
  </tfoot>
</table>
</div>

## Model Lineage

``` r
example_tree <- get_model_lineage(model_dir)

example_tree
```

<strong>Hyperion Model Tree</strong>

ℹ️ <strong>Models:</strong> 8

- <strong style="color:blue">run001</strong> <span style="color:gray">-
  Base model</span>
  - <span style="color:orange">run002</span> <span style="color:gray">-
    Adding COV step, unfixing eps(2)</span>
    - <span style="color:green">run002b001</span>
      <span style="color:gray">- Jittering initial sigma estimates,
      using theta/…</span>
    - <span style="color:green">run002a</span>
      <span style="color:gray">- Some description about what makes
      run002a diffe…</span>
    - <span style="color:orange">run003</span>
      <span style="color:gray">- Jittering initial estimates</span>
      - <span style="color:green">run003b2</span>
        <span style="color:gray">- Updating run003 with mod
        object</span>
      - <span style="color:green">run003b1</span>
        <span style="color:gray">- Updating run003 to 003b1 with
        jittered params. …</span>
  - <span style="color:green">run004</span> <span style="color:gray">-
    Updating run001 to run004 with jittered params …</span>

``` r
spec <- SummarySpec() |>
  set_spec_pvalue(scientific = FALSE)

example_tree |>
  apply_summary_spec(spec) |>
  make_summary_table() |> 
    render_to_image()
```

![](/figures/parameter-tables/unnamed-chunk-15-1.png)
