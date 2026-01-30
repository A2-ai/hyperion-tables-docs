---
title: "Comparison Tables"
pagefind: true
---

``` r
library(hyperion.tables)
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

library(gt)
library(flextable)

model_dir <- system.file("extdata", "models", "onecmt", package = "hyperion.tables")
model_run <- "run003"
```

## Model Comparison

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
  set_spec_sigfig(3) |>
  drop_spec_columns("variability", "shrinkage", "rse") |>
  set_spec_pvalue(scientific = FALSE)

child_mod <- read_model(file.path(model_dir, paste0(model_run, ".mod")))
child_sum <- summary(child_mod)
child_info <- get_model_parameter_info(child_mod)

parent_mod <- read_model(file.path(model_dir, "run002.mod"))
mod_sum <- summary(parent_mod)
info <- get_model_parameter_info(parent_mod)

get_parameters(parent_mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  compare_with(
    get_parameters(child_mod) |>
      apply_table_spec(spec, child_info) |>
      add_summary_info(child_sum),
    labels = c("run002", "run003")
  ) |>
  make_comparison_table()
```

<div id="ljhzwhwuhf" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#ljhzwhwuhf table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#ljhzwhwuhf thead, #ljhzwhwuhf tbody, #ljhzwhwuhf tfoot, #ljhzwhwuhf tr, #ljhzwhwuhf td, #ljhzwhwuhf th {
  border-style: none;
}
&#10;#ljhzwhwuhf p {
  margin: 0;
  padding: 0;
}
&#10;#ljhzwhwuhf .gt_table {
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
&#10;#ljhzwhwuhf .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#ljhzwhwuhf .gt_title {
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
&#10;#ljhzwhwuhf .gt_subtitle {
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
&#10;#ljhzwhwuhf .gt_heading {
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
&#10;#ljhzwhwuhf .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_col_headings {
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
&#10;#ljhzwhwuhf .gt_col_heading {
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
&#10;#ljhzwhwuhf .gt_column_spanner_outer {
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
&#10;#ljhzwhwuhf .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#ljhzwhwuhf .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#ljhzwhwuhf .gt_column_spanner {
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
&#10;#ljhzwhwuhf .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#ljhzwhwuhf .gt_group_heading {
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
&#10;#ljhzwhwuhf .gt_empty_group_heading {
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
&#10;#ljhzwhwuhf .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#ljhzwhwuhf .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#ljhzwhwuhf .gt_row {
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
&#10;#ljhzwhwuhf .gt_stub {
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
&#10;#ljhzwhwuhf .gt_stub_row_group {
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
&#10;#ljhzwhwuhf .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#ljhzwhwuhf .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#ljhzwhwuhf .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ljhzwhwuhf .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#ljhzwhwuhf .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ljhzwhwuhf .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#ljhzwhwuhf .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ljhzwhwuhf .gt_footnotes {
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
&#10;#ljhzwhwuhf .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ljhzwhwuhf .gt_sourcenotes {
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
&#10;#ljhzwhwuhf .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ljhzwhwuhf .gt_left {
  text-align: left;
}
&#10;#ljhzwhwuhf .gt_center {
  text-align: center;
}
&#10;#ljhzwhwuhf .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#ljhzwhwuhf .gt_font_normal {
  font-weight: normal;
}
&#10;#ljhzwhwuhf .gt_font_bold {
  font-weight: bold;
}
&#10;#ljhzwhwuhf .gt_font_italic {
  font-style: italic;
}
&#10;#ljhzwhwuhf .gt_super {
  font-size: 65%;
}
&#10;#ljhzwhwuhf .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#ljhzwhwuhf .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#ljhzwhwuhf .gt_indent_1 {
  text-indent: 5px;
}
&#10;#ljhzwhwuhf .gt_indent_2 {
  text-indent: 10px;
}
&#10;#ljhzwhwuhf .gt_indent_3 {
  text-indent: 15px;
}
&#10;#ljhzwhwuhf .gt_indent_4 {
  text-indent: 20px;
}
&#10;#ljhzwhwuhf .gt_indent_5 {
  text-indent: 25px;
}
&#10;#ljhzwhwuhf .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#ljhzwhwuhf div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="10" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings gt_spanner_row">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="2" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="4" style="font-weight: bold;" scope="colgroup" id="run002">
        <div class="gt_column_spanner">run002</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="5" style="font-weight: bold;" scope="colgroup" id="run003">
        <div class="gt_column_spanner">run003</div>
      </th>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_1">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit_1">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_1">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low_1">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_2">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit_2">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_2">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low_2">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="pct_change_2">% Change</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="10" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>1.25</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[0.994, 1.50]</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>6.31</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>40.8</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[34.9, 46.8]</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-1.68</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>1.24</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[1.02, 1.47]</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-2.59</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="10" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.130</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[0.0125, 0.248]</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-6.19</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.136</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[0.0585, 0.214]</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-9.14</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.114</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[-0.00602, 0.235]</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>7.00</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="10" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="10" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual variance">Residual variance</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual variance  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.0372</span></td>
<td headers="Residual variance  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[0.0145, 0.0600]</span></td>
<td headers="Residual variance  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual variance  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual variance  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.820</span></td></tr>
    <tr><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual variance  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.00661</span></td>
<td headers="Residual variance  ci_low_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>[-0.0481, 0.0613]</span></td>
<td headers="Residual variance  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual variance  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual variance  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-20.2</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> Condition Number: 29.6 (run002), 6.17 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> No. of Observations: 210 (run002), 210 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> OFV: -103.468 (run002), -109.826 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> <span class='gt_from_md'>% Change: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">l</mi></mrow></msub><mo>−</mo><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mfrac><mo>⋅</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\frac{\mathrm{Estimate}_{\mathrm{model}} - \mathrm{Estimate}_{\mathrm{ref}}}{\mathrm{Estimate}_{\mathrm{ref}}} \cdot 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3451em;vertical-align:-0.4509em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8942em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4159em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">model</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span><span class="mbin mtight">−</span><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4509em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="10"> OFV = Objective Function Value</td>
    </tr>
  </tfoot>
</table>
</div>

### Multiple Comparison Table

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
  set_spec_sigfig(3) |>
  set_spec_columns("symbol", "estimate", "ci", "rse", "pct_change") |>
  set_spec_hide_empty(FALSE)

mod1 <- read_model(file.path(model_dir, "run002.mod"))
mod_sum1 <- summary(mod1)
info1 <- get_model_parameter_info(mod1)

mod2 <- read_model(file.path(model_dir, "run003.mod"))
mod_sum2 <- summary(mod2)
info2 <- get_model_parameter_info(mod2)

mod3 <- read_model(file.path(model_dir, "run003b1.mod"))
mod_sum3 <- summary(mod3)
info3 <- get_model_parameter_info(mod3)

comp <- get_parameters(mod1) |>
  apply_table_spec(spec, info1) |>
  add_summary_info(mod_sum1) |>
  compare_with(
    get_parameters(mod2) |>
      apply_table_spec(spec, info2) |>
      add_summary_info(mod_sum2),
    labels = c("run002", "run003")
  ) |>
  compare_with(
    get_parameters(mod3) |>
      apply_table_spec(spec, info3) |>
      add_summary_info(mod_sum3),
    labels = c("run003b1")
  )

comp |>
  make_comparison_table()
```

<div id="upwkerhtaj" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#upwkerhtaj table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#upwkerhtaj thead, #upwkerhtaj tbody, #upwkerhtaj tfoot, #upwkerhtaj tr, #upwkerhtaj td, #upwkerhtaj th {
  border-style: none;
}
&#10;#upwkerhtaj p {
  margin: 0;
  padding: 0;
}
&#10;#upwkerhtaj .gt_table {
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
&#10;#upwkerhtaj .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#upwkerhtaj .gt_title {
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
&#10;#upwkerhtaj .gt_subtitle {
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
&#10;#upwkerhtaj .gt_heading {
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
&#10;#upwkerhtaj .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_col_headings {
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
&#10;#upwkerhtaj .gt_col_heading {
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
&#10;#upwkerhtaj .gt_column_spanner_outer {
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
&#10;#upwkerhtaj .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#upwkerhtaj .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#upwkerhtaj .gt_column_spanner {
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
&#10;#upwkerhtaj .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#upwkerhtaj .gt_group_heading {
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
&#10;#upwkerhtaj .gt_empty_group_heading {
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
&#10;#upwkerhtaj .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#upwkerhtaj .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#upwkerhtaj .gt_row {
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
&#10;#upwkerhtaj .gt_stub {
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
&#10;#upwkerhtaj .gt_stub_row_group {
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
&#10;#upwkerhtaj .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#upwkerhtaj .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#upwkerhtaj .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#upwkerhtaj .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#upwkerhtaj .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#upwkerhtaj .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#upwkerhtaj .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#upwkerhtaj .gt_footnotes {
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
&#10;#upwkerhtaj .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#upwkerhtaj .gt_sourcenotes {
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
&#10;#upwkerhtaj .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#upwkerhtaj .gt_left {
  text-align: left;
}
&#10;#upwkerhtaj .gt_center {
  text-align: center;
}
&#10;#upwkerhtaj .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#upwkerhtaj .gt_font_normal {
  font-weight: normal;
}
&#10;#upwkerhtaj .gt_font_bold {
  font-weight: bold;
}
&#10;#upwkerhtaj .gt_font_italic {
  font-style: italic;
}
&#10;#upwkerhtaj .gt_super {
  font-size: 65%;
}
&#10;#upwkerhtaj .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#upwkerhtaj .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#upwkerhtaj .gt_indent_1 {
  text-indent: 5px;
}
&#10;#upwkerhtaj .gt_indent_2 {
  text-indent: 10px;
}
&#10;#upwkerhtaj .gt_indent_3 {
  text-indent: 15px;
}
&#10;#upwkerhtaj .gt_indent_4 {
  text-indent: 20px;
}
&#10;#upwkerhtaj .gt_indent_5 {
  text-indent: 25px;
}
&#10;#upwkerhtaj .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#upwkerhtaj div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="15" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings gt_spanner_row">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="2" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="4" style="font-weight: bold;" scope="colgroup" id="run002">
        <div class="gt_column_spanner">run002</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="5" style="font-weight: bold;" scope="colgroup" id="run003">
        <div class="gt_column_spanner">run003</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="5" style="font-weight: bold;" scope="colgroup" id="run003b1">
        <div class="gt_column_spanner">run003b1</div>
      </th>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_1">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_1">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low_1">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse_1">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_2">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_2">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low_2">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse_2">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="pct_change_2">% Change vs run002</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_3">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_3">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low_3">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse_3">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="pct_change_3">% Change vs run003</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="15" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>1.25</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[0.994, 1.50]</span></td>
<td headers="Structural model parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>10.3</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>6.31</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>1.25</span></td>
<td headers="Structural model parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-5.67</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>40.8</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[34.9, 46.8]</span></td>
<td headers="Structural model parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>7.41</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-1.68</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>40.3</span></td>
<td headers="Structural model parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.296</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>1.24</span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[1.02, 1.47]</span></td>
<td headers="Structural model parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>9.12</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-2.59</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>4</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{4}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>1.22</span></td>
<td headers="Structural model parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.490</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>WT-on-CL</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.545</span></td>
<td headers="Structural model parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="15" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.130</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[0.0125, 0.248]</span></td>
<td headers="Interindividual variance parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>46.1</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-6.19</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.123</span></td>
<td headers="Interindividual variance parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.756</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.136</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[0.0585, 0.214]</span></td>
<td headers="Interindividual variance parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>29.1</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-9.14</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.125</span></td>
<td headers="Interindividual variance parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.587</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.114</span></td>
<td headers="Interindividual variance parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[-0.00602, 0.235]</span></td>
<td headers="Interindividual variance parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>53.7</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>7.00</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.20</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="15" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_1" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse_2" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.0722</span></td>
<td headers="Interindividual covariance parameters  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-3.17</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="15" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.0372</span></td>
<td headers="Residual error  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[0.0145, 0.0600]</span></td>
<td headers="Residual error  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>31.2</span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse_2" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.820</span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.0374</span></td>
<td headers="Residual error  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-0.496</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right"><span class='gt_from_md'>0.00661</span></td>
<td headers="Residual error  ci_low_1" class="gt_row gt_right"><span class='gt_from_md'>[-0.0481, 0.0613]</span></td>
<td headers="Residual error  rse_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>423</span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  ci_low_2" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse_2" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  pct_change_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>-20.2</span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right"><span class='gt_from_md'>0.00589</span></td>
<td headers="Residual error  ci_low_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  rse_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  pct_change_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>11.8</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> Condition Number: 29.6 (run002), 6.17 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> No. of Observations: 210 (run002), 210 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> OFV: -103.468 (run002), -109.826 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> Condition Number: 6.17 (run003), N/A (run003b1)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> No. of Observations: 210 (run003), 210 (run003b1)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> OFV: -109.826 (run003), -108.889 (run003b1)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> <span class='gt_from_md'>% Change: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">l</mi></mrow></msub><mo>−</mo><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mfrac><mo>⋅</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\frac{\mathrm{Estimate}_{\mathrm{model}} - \mathrm{Estimate}_{\mathrm{ref}}}{\mathrm{Estimate}_{\mathrm{ref}}} \cdot 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3451em;vertical-align:-0.4509em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8942em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4159em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">model</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span><span class="mbin mtight">−</span><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4509em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="15"> OFV = Objective Function Value</td>
    </tr>
  </tfoot>
</table>
</div>

### Structural model comparison

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
  set_spec_sigfig(3) |>
  set_spec_columns("symbol", "fixed", "estimate") |>
  set_spec_title("Structural Model Parameter Comparison")

mod1 <- read_model(file.path(model_dir, "run001.mod"))
mod_sum1 <- summary(mod1)
info1 <- get_model_parameter_info(mod1)

mod2 <- read_model(file.path(model_dir, "run002.mod"))
mod_sum2 <- summary(mod2)
info2 <- get_model_parameter_info(mod2)

mod3 <- read_model(file.path(model_dir, "run003.mod"))
mod_sum3 <- summary(mod3)
info3 <- get_model_parameter_info(mod3)

mod4 <- read_model(file.path(model_dir, "run003b1.mod"))
mod_sum4 <- summary(mod4)
info4 <- get_model_parameter_info(mod4)

comp <- get_parameters(mod1) |>
  apply_table_spec(spec, info1) |>
  add_summary_info(mod_sum1) |>
  compare_with(
    get_parameters(mod2) |>
      apply_table_spec(spec, info2) |>
      add_summary_info(mod_sum2),
    labels = c("run001", "run002")
   ) |>
  compare_with(
    get_parameters(mod3) |>
      apply_table_spec(spec, info3) |>
      add_summary_info(mod_sum3),
    labels = c("run003")
  ) |>
  compare_with(
    get_parameters(mod4) |>
      apply_table_spec(spec, info4) |>
      add_summary_info(mod_sum4),
    labels = c("run004")
  )
comp |>
  make_comparison_table()
```

<div id="szsbllnfse" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#szsbllnfse table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#szsbllnfse thead, #szsbllnfse tbody, #szsbllnfse tfoot, #szsbllnfse tr, #szsbllnfse td, #szsbllnfse th {
  border-style: none;
}
&#10;#szsbllnfse p {
  margin: 0;
  padding: 0;
}
&#10;#szsbllnfse .gt_table {
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
&#10;#szsbllnfse .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#szsbllnfse .gt_title {
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
&#10;#szsbllnfse .gt_subtitle {
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
&#10;#szsbllnfse .gt_heading {
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
&#10;#szsbllnfse .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_col_headings {
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
&#10;#szsbllnfse .gt_col_heading {
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
&#10;#szsbllnfse .gt_column_spanner_outer {
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
&#10;#szsbllnfse .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#szsbllnfse .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#szsbllnfse .gt_column_spanner {
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
&#10;#szsbllnfse .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#szsbllnfse .gt_group_heading {
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
&#10;#szsbllnfse .gt_empty_group_heading {
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
&#10;#szsbllnfse .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#szsbllnfse .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#szsbllnfse .gt_row {
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
&#10;#szsbllnfse .gt_stub {
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
&#10;#szsbllnfse .gt_stub_row_group {
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
&#10;#szsbllnfse .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#szsbllnfse .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#szsbllnfse .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#szsbllnfse .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#szsbllnfse .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#szsbllnfse .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#szsbllnfse .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#szsbllnfse .gt_footnotes {
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
&#10;#szsbllnfse .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#szsbllnfse .gt_sourcenotes {
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
&#10;#szsbllnfse .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#szsbllnfse .gt_left {
  text-align: left;
}
&#10;#szsbllnfse .gt_center {
  text-align: center;
}
&#10;#szsbllnfse .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#szsbllnfse .gt_font_normal {
  font-weight: normal;
}
&#10;#szsbllnfse .gt_font_bold {
  font-weight: bold;
}
&#10;#szsbllnfse .gt_font_italic {
  font-style: italic;
}
&#10;#szsbllnfse .gt_super {
  font-size: 65%;
}
&#10;#szsbllnfse .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#szsbllnfse .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#szsbllnfse .gt_indent_1 {
  text-indent: 5px;
}
&#10;#szsbllnfse .gt_indent_2 {
  text-indent: 10px;
}
&#10;#szsbllnfse .gt_indent_3 {
  text-indent: 15px;
}
&#10;#szsbllnfse .gt_indent_4 {
  text-indent: 20px;
}
&#10;#szsbllnfse .gt_indent_5 {
  text-indent: 25px;
}
&#10;#szsbllnfse .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#szsbllnfse div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="13" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>Structural Model Parameter Comparison</td>
    </tr>
    &#10;    <tr class="gt_col_headings gt_spanner_row">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="2" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="3" style="font-weight: bold;" scope="colgroup" id="run001">
        <div class="gt_column_spanner">run001</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="3" style="font-weight: bold;" scope="colgroup" id="run002">
        <div class="gt_column_spanner">run002</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="3" style="font-weight: bold;" scope="colgroup" id="run003">
        <div class="gt_column_spanner">run003</div>
      </th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="3" style="font-weight: bold;" scope="colgroup" id="run004">
        <div class="gt_column_spanner">run004</div>
      </th>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_1">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="fixed_fmt_1">Fixed</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_1">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_2">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="fixed_fmt_2">Fixed</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_2">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_3">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="fixed_fmt_3">Fixed</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_3">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol_4">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="fixed_fmt_4">Fixed</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate_4">Estimate</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="13" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.24</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.25</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.25</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>40.9</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>40.8</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>40.3</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.24</span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.24</span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>4</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{4}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">4</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>1.22</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>WT-on-CL</span></td>
<td headers="Structural model parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.545</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="13" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.131</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.130</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.123</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.136</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.136</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.125</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'>Fixed</span></td>
<td headers="Interindividual variance parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.100</span></td>
<td headers="Interindividual variance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.114</span></td>
<td headers="Interindividual variance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.124</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="13" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  symbol_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0722</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="13" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Proportional</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0364</span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_4" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Additive</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'>Fixed</span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0100</span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_4" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0372</span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.0374</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual error  symbol_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  fixed_fmt_1" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_1" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'></span></td>
<td headers="Residual error  symbol_2" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_2" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_2" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.00661</span></td>
<td headers="Residual error  symbol_3" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_3" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_3" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  symbol_4" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  fixed_fmt_4" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate_4" class="gt_row gt_right" style="border-right-width: 1px; border-right-style: solid; border-right-color: #D3D3D3;"><span class='gt_from_md'>0.00589</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> Condition Number: 1.98 (run001), 29.6 (run002)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> No. of Observations: 210 (run001), 210 (run002)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> OFV: -103.299 (run001), -103.468 (run002)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> Condition Number: 29.6 (run002), 6.17 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> No. of Observations: 210 (run002), 210 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> OFV: -103.468 (run002), -109.826 (run003)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> Condition Number: 6.17 (run003), N/A (run004)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> No. of Observations: 210 (run003), 210 (run004)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> OFV: -109.826 (run003), -108.889 (run004)</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> <span class='gt_from_md'>% Change: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">m</mi><mi mathvariant="normal">o</mi><mi mathvariant="normal">d</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">l</mi></mrow></msub><mo>−</mo><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mrow><msub><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mrow><mi mathvariant="normal">r</mi><mi mathvariant="normal">e</mi><mi mathvariant="normal">f</mi></mrow></msub></mfrac><mo>⋅</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\frac{\mathrm{Estimate}_{\mathrm{model}} - \mathrm{Estimate}_{\mathrm{ref}}}{\mathrm{Estimate}_{\mathrm{ref}}} \cdot 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.3451em;vertical-align:-0.4509em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8942em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.4159em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">model</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span><span class="mbin mtight">−</span><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight">Estimate</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.3488em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mord mtight"><span class="mord mtight"><span class="mord mathrm mtight" style="margin-right:0.07778em;">ref</span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1512em;"><span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4509em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="13"> OFV = Objective Function Value</td>
    </tr>
  </tfoot>
</table>
</div>
