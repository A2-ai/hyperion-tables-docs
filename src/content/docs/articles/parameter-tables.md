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
  make_parameter_table()
```

<div id="ibcdznocky" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#ibcdznocky table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#ibcdznocky thead, #ibcdznocky tbody, #ibcdznocky tfoot, #ibcdznocky tr, #ibcdznocky td, #ibcdznocky th {
  border-style: none;
}
&#10;#ibcdznocky p {
  margin: 0;
  padding: 0;
}
&#10;#ibcdznocky .gt_table {
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
&#10;#ibcdznocky .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#ibcdznocky .gt_title {
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
&#10;#ibcdznocky .gt_subtitle {
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
&#10;#ibcdznocky .gt_heading {
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
&#10;#ibcdznocky .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_col_headings {
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
&#10;#ibcdznocky .gt_col_heading {
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
&#10;#ibcdznocky .gt_column_spanner_outer {
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
&#10;#ibcdznocky .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#ibcdznocky .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#ibcdznocky .gt_column_spanner {
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
&#10;#ibcdznocky .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#ibcdznocky .gt_group_heading {
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
&#10;#ibcdznocky .gt_empty_group_heading {
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
&#10;#ibcdznocky .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#ibcdznocky .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#ibcdznocky .gt_row {
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
&#10;#ibcdznocky .gt_stub {
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
&#10;#ibcdznocky .gt_stub_row_group {
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
&#10;#ibcdznocky .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#ibcdznocky .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#ibcdznocky .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ibcdznocky .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#ibcdznocky .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ibcdznocky .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#ibcdznocky .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ibcdznocky .gt_footnotes {
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
&#10;#ibcdznocky .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ibcdznocky .gt_sourcenotes {
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
&#10;#ibcdznocky .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ibcdznocky .gt_left {
  text-align: left;
}
&#10;#ibcdznocky .gt_center {
  text-align: center;
}
&#10;#ibcdznocky .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#ibcdznocky .gt_font_normal {
  font-weight: normal;
}
&#10;#ibcdznocky .gt_font_bold {
  font-weight: bold;
}
&#10;#ibcdznocky .gt_font_italic {
  font-style: italic;
}
&#10;#ibcdznocky .gt_super {
  font-size: 65%;
}
&#10;#ibcdznocky .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#ibcdznocky .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#ibcdznocky .gt_indent_1 {
  text-indent: 5px;
}
&#10;#ibcdznocky .gt_indent_2 {
  text-indent: 10px;
}
&#10;#ibcdznocky .gt_indent_3 {
  text-indent: 15px;
}
&#10;#ibcdznocky .gt_indent_4 {
  text-indent: 20px;
}
&#10;#ibcdznocky .gt_indent_5 {
  text-indent: 25px;
}
&#10;#ibcdznocky .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#ibcdznocky div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">run003 Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>PropErr</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>AddErr</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="tugapjnwun" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#tugapjnwun table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#tugapjnwun thead, #tugapjnwun tbody, #tugapjnwun tfoot, #tugapjnwun tr, #tugapjnwun td, #tugapjnwun th {
  border-style: none;
}
&#10;#tugapjnwun p {
  margin: 0;
  padding: 0;
}
&#10;#tugapjnwun .gt_table {
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
&#10;#tugapjnwun .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#tugapjnwun .gt_title {
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
&#10;#tugapjnwun .gt_subtitle {
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
&#10;#tugapjnwun .gt_heading {
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
&#10;#tugapjnwun .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_col_headings {
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
&#10;#tugapjnwun .gt_col_heading {
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
&#10;#tugapjnwun .gt_column_spanner_outer {
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
&#10;#tugapjnwun .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#tugapjnwun .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#tugapjnwun .gt_column_spanner {
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
&#10;#tugapjnwun .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#tugapjnwun .gt_group_heading {
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
&#10;#tugapjnwun .gt_empty_group_heading {
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
&#10;#tugapjnwun .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#tugapjnwun .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#tugapjnwun .gt_row {
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
&#10;#tugapjnwun .gt_stub {
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
&#10;#tugapjnwun .gt_stub_row_group {
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
&#10;#tugapjnwun .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#tugapjnwun .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#tugapjnwun .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tugapjnwun .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#tugapjnwun .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tugapjnwun .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#tugapjnwun .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tugapjnwun .gt_footnotes {
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
&#10;#tugapjnwun .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tugapjnwun .gt_sourcenotes {
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
&#10;#tugapjnwun .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tugapjnwun .gt_left {
  text-align: left;
}
&#10;#tugapjnwun .gt_center {
  text-align: center;
}
&#10;#tugapjnwun .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#tugapjnwun .gt_font_normal {
  font-weight: normal;
}
&#10;#tugapjnwun .gt_font_bold {
  font-weight: bold;
}
&#10;#tugapjnwun .gt_font_italic {
  font-style: italic;
}
&#10;#tugapjnwun .gt_super {
  font-size: 65%;
}
&#10;#tugapjnwun .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#tugapjnwun .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#tugapjnwun .gt_indent_1 {
  text-indent: 5px;
}
&#10;#tugapjnwun .gt_indent_2 {
  text-indent: 10px;
}
&#10;#tugapjnwun .gt_indent_3 {
  text-indent: 15px;
}
&#10;#tugapjnwun .gt_indent_4 {
  text-indent: 20px;
}
&#10;#tugapjnwun .gt_indent_5 {
  text-indent: 25px;
}
&#10;#tugapjnwun .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#tugapjnwun div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">run003 Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Proportional Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Additive Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

``` r
spec <- spec |> set_spec_parameter_names(source = "nonmem")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table()
```

<div id="xvhwgptyli" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#xvhwgptyli table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#xvhwgptyli thead, #xvhwgptyli tbody, #xvhwgptyli tfoot, #xvhwgptyli tr, #xvhwgptyli td, #xvhwgptyli th {
  border-style: none;
}
&#10;#xvhwgptyli p {
  margin: 0;
  padding: 0;
}
&#10;#xvhwgptyli .gt_table {
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
&#10;#xvhwgptyli .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#xvhwgptyli .gt_title {
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
&#10;#xvhwgptyli .gt_subtitle {
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
&#10;#xvhwgptyli .gt_heading {
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
&#10;#xvhwgptyli .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_col_headings {
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
&#10;#xvhwgptyli .gt_col_heading {
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
&#10;#xvhwgptyli .gt_column_spanner_outer {
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
&#10;#xvhwgptyli .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#xvhwgptyli .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#xvhwgptyli .gt_column_spanner {
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
&#10;#xvhwgptyli .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#xvhwgptyli .gt_group_heading {
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
&#10;#xvhwgptyli .gt_empty_group_heading {
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
&#10;#xvhwgptyli .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#xvhwgptyli .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#xvhwgptyli .gt_row {
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
&#10;#xvhwgptyli .gt_stub {
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
&#10;#xvhwgptyli .gt_stub_row_group {
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
&#10;#xvhwgptyli .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#xvhwgptyli .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#xvhwgptyli .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xvhwgptyli .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#xvhwgptyli .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xvhwgptyli .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#xvhwgptyli .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xvhwgptyli .gt_footnotes {
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
&#10;#xvhwgptyli .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xvhwgptyli .gt_sourcenotes {
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
&#10;#xvhwgptyli .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xvhwgptyli .gt_left {
  text-align: left;
}
&#10;#xvhwgptyli .gt_center {
  text-align: center;
}
&#10;#xvhwgptyli .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#xvhwgptyli .gt_font_normal {
  font-weight: normal;
}
&#10;#xvhwgptyli .gt_font_bold {
  font-weight: bold;
}
&#10;#xvhwgptyli .gt_font_italic {
  font-style: italic;
}
&#10;#xvhwgptyli .gt_super {
  font-size: 65%;
}
&#10;#xvhwgptyli .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#xvhwgptyli .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#xvhwgptyli .gt_indent_1 {
  text-indent: 5px;
}
&#10;#xvhwgptyli .gt_indent_2 {
  text-indent: 10px;
}
&#10;#xvhwgptyli .gt_indent_3 {
  text-indent: 15px;
}
&#10;#xvhwgptyli .gt_indent_4 {
  text-indent: 20px;
}
&#10;#xvhwgptyli .gt_indent_5 {
  text-indent: 25px;
}
&#10;#xvhwgptyli .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#xvhwgptyli div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">run003 Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>THETA1</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>THETA2</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>THETA3</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OMEGA(1,1) THETA1</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OMEGA(2,2) THETA2</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OMEGA(3,3) THETA3</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OMEGA(2,1) THETA1, THETA2</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIGMA(1,1)</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIGMA(2,2)</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

### Adding descriptions with `add_spec_columns()`

``` r
spec <- spec |>
  set_spec_parameter_names(source = "display") |>
  add_spec_columns("description")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table()
```

<div id="rceykosfuc" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#rceykosfuc table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#rceykosfuc thead, #rceykosfuc tbody, #rceykosfuc tfoot, #rceykosfuc tr, #rceykosfuc td, #rceykosfuc th {
  border-style: none;
}
&#10;#rceykosfuc p {
  margin: 0;
  padding: 0;
}
&#10;#rceykosfuc .gt_table {
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
&#10;#rceykosfuc .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#rceykosfuc .gt_title {
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
&#10;#rceykosfuc .gt_subtitle {
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
&#10;#rceykosfuc .gt_heading {
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
&#10;#rceykosfuc .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_col_headings {
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
&#10;#rceykosfuc .gt_col_heading {
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
&#10;#rceykosfuc .gt_column_spanner_outer {
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
&#10;#rceykosfuc .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#rceykosfuc .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#rceykosfuc .gt_column_spanner {
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
&#10;#rceykosfuc .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#rceykosfuc .gt_group_heading {
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
&#10;#rceykosfuc .gt_empty_group_heading {
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
&#10;#rceykosfuc .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#rceykosfuc .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#rceykosfuc .gt_row {
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
&#10;#rceykosfuc .gt_stub {
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
&#10;#rceykosfuc .gt_stub_row_group {
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
&#10;#rceykosfuc .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#rceykosfuc .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#rceykosfuc .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rceykosfuc .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#rceykosfuc .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rceykosfuc .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#rceykosfuc .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rceykosfuc .gt_footnotes {
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
&#10;#rceykosfuc .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rceykosfuc .gt_sourcenotes {
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
&#10;#rceykosfuc .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rceykosfuc .gt_left {
  text-align: left;
}
&#10;#rceykosfuc .gt_center {
  text-align: center;
}
&#10;#rceykosfuc .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#rceykosfuc .gt_font_normal {
  font-weight: normal;
}
&#10;#rceykosfuc .gt_font_bold {
  font-weight: bold;
}
&#10;#rceykosfuc .gt_font_italic {
  font-style: italic;
}
&#10;#rceykosfuc .gt_super {
  font-size: 65%;
}
&#10;#rceykosfuc .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#rceykosfuc .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#rceykosfuc .gt_indent_1 {
  text-indent: 5px;
}
&#10;#rceykosfuc .gt_indent_2 {
  text-indent: 10px;
}
&#10;#rceykosfuc .gt_indent_3 {
  text-indent: 15px;
}
&#10;#rceykosfuc .gt_indent_4 {
  text-indent: 20px;
}
&#10;#rceykosfuc .gt_indent_5 {
  text-indent: 25px;
}
&#10;#rceykosfuc .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#rceykosfuc div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="9" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">run003 Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="description"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="9" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Clearance</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Central Volume</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Absorption Rate Constant</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="9" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Interindividual variability on CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Interindividual variability on Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Interindividual variability on KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="9" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  description" class="gt_row gt_left"><span class='gt_from_md'>Interindividual covariance for CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="9" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Proportional Error</span></td>
<td headers="Residual error  description" class="gt_row gt_left"><span class='gt_from_md'>Proportional Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Additive Error</span></td>
<td headers="Residual error  description" class="gt_row gt_left"><span class='gt_from_md'>Additive Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="9"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="icmtykayur" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#icmtykayur table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#icmtykayur thead, #icmtykayur tbody, #icmtykayur tfoot, #icmtykayur tr, #icmtykayur td, #icmtykayur th {
  border-style: none;
}
&#10;#icmtykayur p {
  margin: 0;
  padding: 0;
}
&#10;#icmtykayur .gt_table {
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
&#10;#icmtykayur .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#icmtykayur .gt_title {
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
&#10;#icmtykayur .gt_subtitle {
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
&#10;#icmtykayur .gt_heading {
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
&#10;#icmtykayur .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#icmtykayur .gt_col_headings {
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
&#10;#icmtykayur .gt_col_heading {
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
&#10;#icmtykayur .gt_column_spanner_outer {
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
&#10;#icmtykayur .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#icmtykayur .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#icmtykayur .gt_column_spanner {
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
&#10;#icmtykayur .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#icmtykayur .gt_group_heading {
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
&#10;#icmtykayur .gt_empty_group_heading {
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
&#10;#icmtykayur .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#icmtykayur .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#icmtykayur .gt_row {
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
&#10;#icmtykayur .gt_stub {
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
&#10;#icmtykayur .gt_stub_row_group {
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
&#10;#icmtykayur .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#icmtykayur .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#icmtykayur .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#icmtykayur .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#icmtykayur .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#icmtykayur .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#icmtykayur .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#icmtykayur .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#icmtykayur .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#icmtykayur .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#icmtykayur .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#icmtykayur .gt_footnotes {
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
&#10;#icmtykayur .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#icmtykayur .gt_sourcenotes {
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
&#10;#icmtykayur .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#icmtykayur .gt_left {
  text-align: left;
}
&#10;#icmtykayur .gt_center {
  text-align: center;
}
&#10;#icmtykayur .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#icmtykayur .gt_font_normal {
  font-weight: normal;
}
&#10;#icmtykayur .gt_font_bold {
  font-weight: bold;
}
&#10;#icmtykayur .gt_font_italic {
  font-style: italic;
}
&#10;#icmtykayur .gt_super {
  font-size: 65%;
}
&#10;#icmtykayur .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#icmtykayur .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#icmtykayur .gt_indent_1 {
  text-indent: 5px;
}
&#10;#icmtykayur .gt_indent_2 {
  text-indent: 10px;
}
&#10;#icmtykayur .gt_indent_3 {
  text-indent: 15px;
}
&#10;#icmtykayur .gt_indent_4 {
  text-indent: 20px;
}
&#10;#icmtykayur .gt_indent_5 {
  text-indent: 25px;
}
&#10;#icmtykayur .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#icmtykayur div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="7" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Proportional Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Additive Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

``` r
## Drop multiple columns
spec <- spec |> drop_spec_columns("shrinkage")

get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum) |>
  make_parameter_table()
```

<div id="sgvyzeiqvp" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#sgvyzeiqvp table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#sgvyzeiqvp thead, #sgvyzeiqvp tbody, #sgvyzeiqvp tfoot, #sgvyzeiqvp tr, #sgvyzeiqvp td, #sgvyzeiqvp th {
  border-style: none;
}
&#10;#sgvyzeiqvp p {
  margin: 0;
  padding: 0;
}
&#10;#sgvyzeiqvp .gt_table {
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
&#10;#sgvyzeiqvp .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#sgvyzeiqvp .gt_title {
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
&#10;#sgvyzeiqvp .gt_subtitle {
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
&#10;#sgvyzeiqvp .gt_heading {
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
&#10;#sgvyzeiqvp .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_col_headings {
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
&#10;#sgvyzeiqvp .gt_col_heading {
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
&#10;#sgvyzeiqvp .gt_column_spanner_outer {
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
&#10;#sgvyzeiqvp .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#sgvyzeiqvp .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#sgvyzeiqvp .gt_column_spanner {
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
&#10;#sgvyzeiqvp .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#sgvyzeiqvp .gt_group_heading {
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
&#10;#sgvyzeiqvp .gt_empty_group_heading {
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
&#10;#sgvyzeiqvp .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#sgvyzeiqvp .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#sgvyzeiqvp .gt_row {
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
&#10;#sgvyzeiqvp .gt_stub {
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
&#10;#sgvyzeiqvp .gt_stub_row_group {
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
&#10;#sgvyzeiqvp .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#sgvyzeiqvp .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#sgvyzeiqvp .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#sgvyzeiqvp .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#sgvyzeiqvp .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#sgvyzeiqvp .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#sgvyzeiqvp .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#sgvyzeiqvp .gt_footnotes {
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
&#10;#sgvyzeiqvp .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#sgvyzeiqvp .gt_sourcenotes {
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
&#10;#sgvyzeiqvp .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#sgvyzeiqvp .gt_left {
  text-align: left;
}
&#10;#sgvyzeiqvp .gt_center {
  text-align: center;
}
&#10;#sgvyzeiqvp .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#sgvyzeiqvp .gt_font_normal {
  font-weight: normal;
}
&#10;#sgvyzeiqvp .gt_font_bold {
  font-weight: bold;
}
&#10;#sgvyzeiqvp .gt_font_italic {
  font-style: italic;
}
&#10;#sgvyzeiqvp .gt_super {
  font-size: 65%;
}
&#10;#sgvyzeiqvp .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#sgvyzeiqvp .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#sgvyzeiqvp .gt_indent_1 {
  text-indent: 5px;
}
&#10;#sgvyzeiqvp .gt_indent_2 {
  text-indent: 10px;
}
&#10;#sgvyzeiqvp .gt_indent_3 {
  text-indent: 15px;
}
&#10;#sgvyzeiqvp .gt_indent_4 {
  text-indent: 20px;
}
&#10;#sgvyzeiqvp .gt_indent_5 {
  text-indent: 25px;
}
&#10;#sgvyzeiqvp .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#sgvyzeiqvp div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="6" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="6" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="6" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0236, 0.221]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0519, 0.196]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0121, 0.233]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="6" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0131, 0.136]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="6" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Proportional Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>Additive Error</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="nufqxufpol" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#nufqxufpol table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#nufqxufpol thead, #nufqxufpol tbody, #nufqxufpol tfoot, #nufqxufpol tr, #nufqxufpol td, #nufqxufpol th {
  border-style: none;
}
&#10;#nufqxufpol p {
  margin: 0;
  padding: 0;
}
&#10;#nufqxufpol .gt_table {
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
&#10;#nufqxufpol .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#nufqxufpol .gt_title {
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
&#10;#nufqxufpol .gt_subtitle {
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
&#10;#nufqxufpol .gt_heading {
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
&#10;#nufqxufpol .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_col_headings {
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
&#10;#nufqxufpol .gt_col_heading {
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
&#10;#nufqxufpol .gt_column_spanner_outer {
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
&#10;#nufqxufpol .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#nufqxufpol .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#nufqxufpol .gt_column_spanner {
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
&#10;#nufqxufpol .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#nufqxufpol .gt_group_heading {
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
&#10;#nufqxufpol .gt_empty_group_heading {
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
&#10;#nufqxufpol .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#nufqxufpol .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#nufqxufpol .gt_row {
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
&#10;#nufqxufpol .gt_stub {
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
&#10;#nufqxufpol .gt_stub_row_group {
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
&#10;#nufqxufpol .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#nufqxufpol .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#nufqxufpol .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#nufqxufpol .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#nufqxufpol .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#nufqxufpol .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#nufqxufpol .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#nufqxufpol .gt_footnotes {
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
&#10;#nufqxufpol .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#nufqxufpol .gt_sourcenotes {
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
&#10;#nufqxufpol .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#nufqxufpol .gt_left {
  text-align: left;
}
&#10;#nufqxufpol .gt_center {
  text-align: center;
}
&#10;#nufqxufpol .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#nufqxufpol .gt_font_normal {
  font-weight: normal;
}
&#10;#nufqxufpol .gt_font_bold {
  font-weight: bold;
}
&#10;#nufqxufpol .gt_font_italic {
  font-style: italic;
}
&#10;#nufqxufpol .gt_super {
  font-size: 65%;
}
&#10;#nufqxufpol .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#nufqxufpol .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#nufqxufpol .gt_indent_1 {
  text-indent: 5px;
}
&#10;#nufqxufpol .gt_indent_2 {
  text-indent: 10px;
}
&#10;#nufqxufpol .gt_indent_3 {
  text-indent: 15px;
}
&#10;#nufqxufpol .gt_indent_4 {
  text-indent: 20px;
}
&#10;#nufqxufpol .gt_indent_5 {
  text-indent: 25px;
}
&#10;#nufqxufpol .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#nufqxufpol div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="7" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.997, 1.43]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> CI = confidence intervals; RSE = relative standard error; SE = standard error</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="blzdvsxiuj" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#blzdvsxiuj table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#blzdvsxiuj thead, #blzdvsxiuj tbody, #blzdvsxiuj tfoot, #blzdvsxiuj tr, #blzdvsxiuj td, #blzdvsxiuj th {
  border-style: none;
}
&#10;#blzdvsxiuj p {
  margin: 0;
  padding: 0;
}
&#10;#blzdvsxiuj .gt_table {
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
&#10;#blzdvsxiuj .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#blzdvsxiuj .gt_title {
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
&#10;#blzdvsxiuj .gt_subtitle {
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
&#10;#blzdvsxiuj .gt_heading {
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
&#10;#blzdvsxiuj .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_col_headings {
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
&#10;#blzdvsxiuj .gt_col_heading {
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
&#10;#blzdvsxiuj .gt_column_spanner_outer {
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
&#10;#blzdvsxiuj .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#blzdvsxiuj .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#blzdvsxiuj .gt_column_spanner {
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
&#10;#blzdvsxiuj .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#blzdvsxiuj .gt_group_heading {
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
&#10;#blzdvsxiuj .gt_empty_group_heading {
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
&#10;#blzdvsxiuj .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#blzdvsxiuj .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#blzdvsxiuj .gt_row {
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
&#10;#blzdvsxiuj .gt_stub {
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
&#10;#blzdvsxiuj .gt_stub_row_group {
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
&#10;#blzdvsxiuj .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#blzdvsxiuj .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#blzdvsxiuj .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#blzdvsxiuj .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#blzdvsxiuj .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#blzdvsxiuj .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#blzdvsxiuj .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#blzdvsxiuj .gt_footnotes {
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
&#10;#blzdvsxiuj .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#blzdvsxiuj .gt_sourcenotes {
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
&#10;#blzdvsxiuj .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#blzdvsxiuj .gt_left {
  text-align: left;
}
&#10;#blzdvsxiuj .gt_center {
  text-align: center;
}
&#10;#blzdvsxiuj .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#blzdvsxiuj .gt_font_normal {
  font-weight: normal;
}
&#10;#blzdvsxiuj .gt_font_bold {
  font-weight: bold;
}
&#10;#blzdvsxiuj .gt_font_italic {
  font-style: italic;
}
&#10;#blzdvsxiuj .gt_super {
  font-size: 65%;
}
&#10;#blzdvsxiuj .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#blzdvsxiuj .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#blzdvsxiuj .gt_indent_1 {
  text-indent: 5px;
}
&#10;#blzdvsxiuj .gt_indent_2 {
  text-indent: 10px;
}
&#10;#blzdvsxiuj .gt_indent_3 {
  text-indent: 15px;
}
&#10;#blzdvsxiuj .gt_indent_4 {
  text-indent: 20px;
}
&#10;#blzdvsxiuj .gt_indent_5 {
  text-indent: 25px;
}
&#10;#blzdvsxiuj .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#blzdvsxiuj div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="7" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">95% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Random Effect Parameters">Random Effect Parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Random Effect Parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Random Effect Parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(1,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Random Effect Parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Random Effect Parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Random Effect Parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.02, 1.25]</span></td>
<td headers="Random Effect Parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Random Effect Parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Random Effect Parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Random Effect Parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Random Effect Parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.08</span></td>
<td headers="Random Effect Parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Random Effect Parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.01, 1.15]</span></td>
<td headers="Random Effect Parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Random Effect Parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Random Effect Parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Random Effect Parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,2)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Random Effect Parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Random Effect Parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Random Effect Parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.05, 1.22]</span></td>
<td headers="Random Effect Parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Random Effect Parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Random Effect Parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Random Effect Parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(3,3)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Random Effect Parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Random Effect Parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Random Effect Parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.01, 1.26]</span></td>
<td headers="Random Effect Parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Random Effect Parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="7" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual Error">Residual Error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual Error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual Error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual Error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual Error  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual Error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual Error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual Error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual Error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual Error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual Error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual Error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual Error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual Error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual Error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>95% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.025</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.025} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.025</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="7"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="oofankbium" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#oofankbium table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#oofankbium thead, #oofankbium tbody, #oofankbium tfoot, #oofankbium tr, #oofankbium td, #oofankbium th {
  border-style: none;
}
&#10;#oofankbium p {
  margin: 0;
  padding: 0;
}
&#10;#oofankbium .gt_table {
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
&#10;#oofankbium .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#oofankbium .gt_title {
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
&#10;#oofankbium .gt_subtitle {
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
&#10;#oofankbium .gt_heading {
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
&#10;#oofankbium .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oofankbium .gt_col_headings {
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
&#10;#oofankbium .gt_col_heading {
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
&#10;#oofankbium .gt_column_spanner_outer {
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
&#10;#oofankbium .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#oofankbium .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#oofankbium .gt_column_spanner {
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
&#10;#oofankbium .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#oofankbium .gt_group_heading {
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
&#10;#oofankbium .gt_empty_group_heading {
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
&#10;#oofankbium .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#oofankbium .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#oofankbium .gt_row {
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
&#10;#oofankbium .gt_stub {
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
&#10;#oofankbium .gt_stub_row_group {
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
&#10;#oofankbium .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#oofankbium .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#oofankbium .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oofankbium .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#oofankbium .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#oofankbium .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oofankbium .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oofankbium .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#oofankbium .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#oofankbium .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#oofankbium .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oofankbium .gt_footnotes {
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
&#10;#oofankbium .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oofankbium .gt_sourcenotes {
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
&#10;#oofankbium .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oofankbium .gt_left {
  text-align: left;
}
&#10;#oofankbium .gt_center {
  text-align: center;
}
&#10;#oofankbium .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#oofankbium .gt_font_normal {
  font-weight: normal;
}
&#10;#oofankbium .gt_font_bold {
  font-weight: bold;
}
&#10;#oofankbium .gt_font_italic {
  font-style: italic;
}
&#10;#oofankbium .gt_super {
  font-size: 65%;
}
&#10;#oofankbium .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#oofankbium .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#oofankbium .gt_indent_1 {
  text-indent: 5px;
}
&#10;#oofankbium .gt_indent_2 {
  text-indent: 10px;
}
&#10;#oofankbium .gt_indent_3 {
  text-indent: 15px;
}
&#10;#oofankbium .gt_indent_4 {
  text-indent: 20px;
}
&#10;#oofankbium .gt_indent_5 {
  text-indent: 25px;
}
&#10;#oofankbium .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#oofankbium div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">70% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.21, 1.44]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[37.2, 43.1]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.10, 1.33]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0702, 0.175]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0858, 0.162]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0641, 0.181]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0421, 0.107]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual variance">Residual variance</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.194)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0313, 0.0438]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.00427, 0.0148]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction | Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>70% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.15</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.15} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.15</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

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
  make_parameter_table()
```

<div id="jyytdlizjx" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#jyytdlizjx table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#jyytdlizjx thead, #jyytdlizjx tbody, #jyytdlizjx tfoot, #jyytdlizjx tr, #jyytdlizjx td, #jyytdlizjx th {
  border-style: none;
}
&#10;#jyytdlizjx p {
  margin: 0;
  padding: 0;
}
&#10;#jyytdlizjx .gt_table {
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
&#10;#jyytdlizjx .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#jyytdlizjx .gt_title {
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
&#10;#jyytdlizjx .gt_subtitle {
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
&#10;#jyytdlizjx .gt_heading {
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
&#10;#jyytdlizjx .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_col_headings {
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
&#10;#jyytdlizjx .gt_col_heading {
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
&#10;#jyytdlizjx .gt_column_spanner_outer {
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
&#10;#jyytdlizjx .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#jyytdlizjx .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#jyytdlizjx .gt_column_spanner {
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
&#10;#jyytdlizjx .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#jyytdlizjx .gt_group_heading {
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
&#10;#jyytdlizjx .gt_empty_group_heading {
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
&#10;#jyytdlizjx .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#jyytdlizjx .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#jyytdlizjx .gt_row {
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
&#10;#jyytdlizjx .gt_stub {
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
&#10;#jyytdlizjx .gt_stub_row_group {
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
&#10;#jyytdlizjx .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#jyytdlizjx .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#jyytdlizjx .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jyytdlizjx .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#jyytdlizjx .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jyytdlizjx .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#jyytdlizjx .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jyytdlizjx .gt_footnotes {
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
&#10;#jyytdlizjx .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jyytdlizjx .gt_sourcenotes {
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
&#10;#jyytdlizjx .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jyytdlizjx .gt_left {
  text-align: left;
}
&#10;#jyytdlizjx .gt_center {
  text-align: center;
}
&#10;#jyytdlizjx .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#jyytdlizjx .gt_font_normal {
  font-weight: normal;
}
&#10;#jyytdlizjx .gt_font_bold {
  font-weight: bold;
}
&#10;#jyytdlizjx .gt_font_italic {
  font-style: italic;
}
&#10;#jyytdlizjx .gt_super {
  font-size: 65%;
}
&#10;#jyytdlizjx .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#jyytdlizjx .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#jyytdlizjx .gt_indent_1 {
  text-indent: 5px;
}
&#10;#jyytdlizjx .gt_indent_2 {
  text-indent: 10px;
}
&#10;#jyytdlizjx .gt_indent_3 {
  text-indent: 15px;
}
&#10;#jyytdlizjx .gt_indent_4 {
  text-indent: 20px;
}
&#10;#jyytdlizjx .gt_indent_5 {
  text-indent: 25px;
}
&#10;#jyytdlizjx .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#jyytdlizjx div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">70% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.21, 1.44]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[37.2, 43.1]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.10, 1.33]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0702, 0.175]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0858, 0.162]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0641, 0.181]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0421, 0.107]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual variance">Residual variance</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>PropErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0313, 0.0438]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>AddErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.00427, 0.0148]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction | Objective function value: -109.826</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>70% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.15</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.15} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.15</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

``` r
get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum, show_cond_num = FALSE, show_ofv = FALSE) |>
  make_parameter_table()
```

<div id="rweadxdcny" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#rweadxdcny table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#rweadxdcny thead, #rweadxdcny tbody, #rweadxdcny tfoot, #rweadxdcny tr, #rweadxdcny td, #rweadxdcny th {
  border-style: none;
}
&#10;#rweadxdcny p {
  margin: 0;
  padding: 0;
}
&#10;#rweadxdcny .gt_table {
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
&#10;#rweadxdcny .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#rweadxdcny .gt_title {
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
&#10;#rweadxdcny .gt_subtitle {
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
&#10;#rweadxdcny .gt_heading {
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
&#10;#rweadxdcny .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_col_headings {
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
&#10;#rweadxdcny .gt_col_heading {
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
&#10;#rweadxdcny .gt_column_spanner_outer {
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
&#10;#rweadxdcny .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#rweadxdcny .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#rweadxdcny .gt_column_spanner {
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
&#10;#rweadxdcny .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#rweadxdcny .gt_group_heading {
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
&#10;#rweadxdcny .gt_empty_group_heading {
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
&#10;#rweadxdcny .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#rweadxdcny .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#rweadxdcny .gt_row {
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
&#10;#rweadxdcny .gt_stub {
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
&#10;#rweadxdcny .gt_stub_row_group {
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
&#10;#rweadxdcny .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#rweadxdcny .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#rweadxdcny .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rweadxdcny .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#rweadxdcny .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rweadxdcny .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#rweadxdcny .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rweadxdcny .gt_footnotes {
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
&#10;#rweadxdcny .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rweadxdcny .gt_sourcenotes {
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
&#10;#rweadxdcny .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rweadxdcny .gt_left {
  text-align: left;
}
&#10;#rweadxdcny .gt_center {
  text-align: center;
}
&#10;#rweadxdcny .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#rweadxdcny .gt_font_normal {
  font-weight: normal;
}
&#10;#rweadxdcny .gt_font_bold {
  font-weight: bold;
}
&#10;#rweadxdcny .gt_font_italic {
  font-style: italic;
}
&#10;#rweadxdcny .gt_super {
  font-size: 65%;
}
&#10;#rweadxdcny .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#rweadxdcny .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#rweadxdcny .gt_indent_1 {
  text-indent: 5px;
}
&#10;#rweadxdcny .gt_indent_2 {
  text-indent: 10px;
}
&#10;#rweadxdcny .gt_indent_3 {
  text-indent: 15px;
}
&#10;#rweadxdcny .gt_indent_4 {
  text-indent: 20px;
}
&#10;#rweadxdcny .gt_indent_5 {
  text-indent: 25px;
}
&#10;#rweadxdcny .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#rweadxdcny div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">70% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.21, 1.44]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[37.2, 43.1]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.10, 1.33]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0702, 0.175]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0858, 0.162]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0641, 0.181]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0421, 0.107]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual variance">Residual variance</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>PropErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0313, 0.0438]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>AddErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.00427, 0.0148]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> First Order Conditional Estimation with Interaction</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>70% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.15</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.15} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.15</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

``` r
get_parameters(mod) |>
  apply_table_spec(spec, info) |>
  add_summary_info(mod_sum, show_method = FALSE) |>
  make_parameter_table()
```

<div id="oizqbgdwwh" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#oizqbgdwwh table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#oizqbgdwwh thead, #oizqbgdwwh tbody, #oizqbgdwwh tfoot, #oizqbgdwwh tr, #oizqbgdwwh td, #oizqbgdwwh th {
  border-style: none;
}
&#10;#oizqbgdwwh p {
  margin: 0;
  padding: 0;
}
&#10;#oizqbgdwwh .gt_table {
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
&#10;#oizqbgdwwh .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#oizqbgdwwh .gt_title {
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
&#10;#oizqbgdwwh .gt_subtitle {
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
&#10;#oizqbgdwwh .gt_heading {
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
&#10;#oizqbgdwwh .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_col_headings {
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
&#10;#oizqbgdwwh .gt_col_heading {
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
&#10;#oizqbgdwwh .gt_column_spanner_outer {
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
&#10;#oizqbgdwwh .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#oizqbgdwwh .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#oizqbgdwwh .gt_column_spanner {
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
&#10;#oizqbgdwwh .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#oizqbgdwwh .gt_group_heading {
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
&#10;#oizqbgdwwh .gt_empty_group_heading {
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
&#10;#oizqbgdwwh .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#oizqbgdwwh .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#oizqbgdwwh .gt_row {
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
&#10;#oizqbgdwwh .gt_stub {
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
&#10;#oizqbgdwwh .gt_stub_row_group {
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
&#10;#oizqbgdwwh .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#oizqbgdwwh .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#oizqbgdwwh .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oizqbgdwwh .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#oizqbgdwwh .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oizqbgdwwh .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#oizqbgdwwh .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oizqbgdwwh .gt_footnotes {
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
&#10;#oizqbgdwwh .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oizqbgdwwh .gt_sourcenotes {
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
&#10;#oizqbgdwwh .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oizqbgdwwh .gt_left {
  text-align: left;
}
&#10;#oizqbgdwwh .gt_center {
  text-align: center;
}
&#10;#oizqbgdwwh .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#oizqbgdwwh .gt_font_normal {
  font-weight: normal;
}
&#10;#oizqbgdwwh .gt_font_bold {
  font-weight: bold;
}
&#10;#oizqbgdwwh .gt_font_italic {
  font-style: italic;
}
&#10;#oizqbgdwwh .gt_super {
  font-size: 65%;
}
&#10;#oizqbgdwwh .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#oizqbgdwwh .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#oizqbgdwwh .gt_indent_1 {
  text-indent: 5px;
}
&#10;#oizqbgdwwh .gt_indent_2 {
  text-indent: 10px;
}
&#10;#oizqbgdwwh .gt_indent_3 {
  text-indent: 15px;
}
&#10;#oizqbgdwwh .gt_indent_4 {
  text-indent: 20px;
}
&#10;#oizqbgdwwh .gt_indent_5 {
  text-indent: 25px;
}
&#10;#oizqbgdwwh .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#oizqbgdwwh div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Model Parameters</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="name">Parameter</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="symbol">Symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="unit">Unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimate">Estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="variability"></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ci_low">70% CI</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="rse">RSE (%)</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="shrinkage">Shrinkage (%)</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>CL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.21, 1.44]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>Vc</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[37.2, 43.1]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>KA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.21</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.10, 1.33]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.06</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0702, 0.175]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-Vc</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.124</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0858, 0.162]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-KA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(3,3)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.122</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0641, 0.181]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>IIV-CL-Vc</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Omega_{(2,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0745</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0421, 0.107]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual variance">Residual variance</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>PropErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 19.4%)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0313, 0.0438]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual variance  name" class="gt_row gt_left"><span class='gt_from_md'>AddErr</span></td>
<td headers="Residual variance  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual variance  unit" class="gt_row gt_left"><span class='gt_from_md'>ng/mL</span></td>
<td headers="Residual variance  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual variance  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual variance  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.00427, 0.0148]</span></td>
<td headers="Residual variance  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual variance  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Objective function value: -109.826 | Condition Number: 6.17</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>70% CI: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo>±</mo><msub><mi>z</mi><mn>0.15</mn></msub><mo>⋅</mo><mrow><mi mathvariant="normal">S</mi><mi mathvariant="normal">E</mi></mrow></mrow><annotation encoding="application/x-tex">\mathrm{Estimate} \pm z_{0.15} \cdot \mathrm{SE}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7667em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.5945em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.04398em;">z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.044em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">0.15</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathrm">SE</span></span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for log-normal <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Ω</mi></mrow><annotation encoding="application/x-tex">\Omega</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Ω</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\exp(\mathrm{Estimate}) - 1} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.305em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.935em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord mathrm">Estimate</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">1</span></span></span><span style="top:-2.895em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.305em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> <span class='gt_from_md'>CV% for proportional <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Σ</mi></mrow><annotation encoding="application/x-tex">\Sigma</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Σ</span></span></span></span>: <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msqrt><mrow><mi mathvariant="normal">E</mi><mi mathvariant="normal">s</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">i</mi><mi mathvariant="normal">m</mi><mi mathvariant="normal">a</mi><mi mathvariant="normal">t</mi><mi mathvariant="normal">e</mi></mrow></msqrt><mo>×</mo><mn>100</mn></mrow><annotation encoding="application/x-tex">\sqrt{\mathrm{Estimate}} \times 100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.04em;vertical-align:-0.1133em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9267em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathrm">Estimate</span></span></span></span><span style="top:-2.8867em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.08em' viewBox='0 0 400000 1080' preserveAspectRatio='xMinYMin slice'><path d='M95,702
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
M834 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1133em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">100</span></span></span></span></span></td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CI = confidence intervals; RSE = relative standard error; SE = standard error;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> CV = coefficient of variation; SD = standard deviation; Corr = correlation</td>
    </tr>
  </tfoot>
</table>
</div>

## Transformation Reference

The following table shows how CV, RSE, and CI are computed for each
transform and parameter type combination.

<div id="mavblgeqvf" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#mavblgeqvf table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#mavblgeqvf thead, #mavblgeqvf tbody, #mavblgeqvf tfoot, #mavblgeqvf tr, #mavblgeqvf td, #mavblgeqvf th {
  border-style: none;
}
&#10;#mavblgeqvf p {
  margin: 0;
  padding: 0;
}
&#10;#mavblgeqvf .gt_table {
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
&#10;#mavblgeqvf .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#mavblgeqvf .gt_title {
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
&#10;#mavblgeqvf .gt_subtitle {
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
&#10;#mavblgeqvf .gt_heading {
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
&#10;#mavblgeqvf .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_col_headings {
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
&#10;#mavblgeqvf .gt_col_heading {
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
&#10;#mavblgeqvf .gt_column_spanner_outer {
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
&#10;#mavblgeqvf .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#mavblgeqvf .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#mavblgeqvf .gt_column_spanner {
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
&#10;#mavblgeqvf .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#mavblgeqvf .gt_group_heading {
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
&#10;#mavblgeqvf .gt_empty_group_heading {
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
&#10;#mavblgeqvf .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#mavblgeqvf .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#mavblgeqvf .gt_row {
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
&#10;#mavblgeqvf .gt_stub {
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
&#10;#mavblgeqvf .gt_stub_row_group {
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
&#10;#mavblgeqvf .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#mavblgeqvf .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#mavblgeqvf .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mavblgeqvf .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#mavblgeqvf .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mavblgeqvf .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#mavblgeqvf .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mavblgeqvf .gt_footnotes {
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
&#10;#mavblgeqvf .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mavblgeqvf .gt_sourcenotes {
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
&#10;#mavblgeqvf .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mavblgeqvf .gt_left {
  text-align: left;
}
&#10;#mavblgeqvf .gt_center {
  text-align: center;
}
&#10;#mavblgeqvf .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#mavblgeqvf .gt_font_normal {
  font-weight: normal;
}
&#10;#mavblgeqvf .gt_font_bold {
  font-weight: bold;
}
&#10;#mavblgeqvf .gt_font_italic {
  font-style: italic;
}
&#10;#mavblgeqvf .gt_super {
  font-size: 65%;
}
&#10;#mavblgeqvf .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#mavblgeqvf .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#mavblgeqvf .gt_indent_1 {
  text-indent: 5px;
}
&#10;#mavblgeqvf .gt_indent_2 {
  text-indent: 10px;
}
&#10;#mavblgeqvf .gt_indent_3 {
  text-indent: 15px;
}
&#10;#mavblgeqvf .gt_indent_4 {
  text-indent: 20px;
}
&#10;#mavblgeqvf .gt_indent_5 {
  text-indent: 25px;
}
&#10;#mavblgeqvf .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#mavblgeqvf div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
  - <span style="color:green">run004</span> <span style="color:gray">-
    Updating run001 to run004 with jittered params …</span>
  - <span style="color:orange">run002</span> <span style="color:gray">-
    Adding COV step, unfixing eps(2)</span>
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
    - <span style="color:green">run002b001</span>
      <span style="color:gray">- Jittering initial sigma estimates,
      using theta/…</span>

``` r
spec <- SummarySpec() |>
  set_spec_pvalue(scientific = FALSE)

example_tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="zurtpldfkd" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#zurtpldfkd table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#zurtpldfkd thead, #zurtpldfkd tbody, #zurtpldfkd tfoot, #zurtpldfkd tr, #zurtpldfkd td, #zurtpldfkd th {
  border-style: none;
}
&#10;#zurtpldfkd p {
  margin: 0;
  padding: 0;
}
&#10;#zurtpldfkd .gt_table {
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
&#10;#zurtpldfkd .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#zurtpldfkd .gt_title {
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
&#10;#zurtpldfkd .gt_subtitle {
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
&#10;#zurtpldfkd .gt_heading {
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
&#10;#zurtpldfkd .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_col_headings {
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
&#10;#zurtpldfkd .gt_col_heading {
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
&#10;#zurtpldfkd .gt_column_spanner_outer {
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
&#10;#zurtpldfkd .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#zurtpldfkd .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#zurtpldfkd .gt_column_spanner {
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
&#10;#zurtpldfkd .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#zurtpldfkd .gt_group_heading {
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
&#10;#zurtpldfkd .gt_empty_group_heading {
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
&#10;#zurtpldfkd .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#zurtpldfkd .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#zurtpldfkd .gt_row {
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
&#10;#zurtpldfkd .gt_stub {
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
&#10;#zurtpldfkd .gt_stub_row_group {
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
&#10;#zurtpldfkd .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#zurtpldfkd .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#zurtpldfkd .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#zurtpldfkd .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#zurtpldfkd .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#zurtpldfkd .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#zurtpldfkd .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#zurtpldfkd .gt_footnotes {
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
&#10;#zurtpldfkd .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#zurtpldfkd .gt_sourcenotes {
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
&#10;#zurtpldfkd .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#zurtpldfkd .gt_left {
  text-align: left;
}
&#10;#zurtpldfkd .gt_center {
  text-align: center;
}
&#10;#zurtpldfkd .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#zurtpldfkd .gt_font_normal {
  font-weight: normal;
}
&#10;#zurtpldfkd .gt_font_bold {
  font-weight: bold;
}
&#10;#zurtpldfkd .gt_font_italic {
  font-style: italic;
}
&#10;#zurtpldfkd .gt_super {
  font-size: 65%;
}
&#10;#zurtpldfkd .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#zurtpldfkd .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#zurtpldfkd .gt_indent_1 {
  text-indent: 5px;
}
&#10;#zurtpldfkd .gt_indent_2 {
  text-indent: 10px;
}
&#10;#zurtpldfkd .gt_indent_3 {
  text-indent: 15px;
}
&#10;#zurtpldfkd .gt_indent_4 {
  text-indent: 20px;
}
&#10;#zurtpldfkd .gt_indent_5 {
  text-indent: 25px;
}
&#10;#zurtpldfkd .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#zurtpldfkd div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Run Summary</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="model">Model</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="based_on">Reference</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="description">Description</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="n_parameters">No. Params</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="condition_number">Cond. No.</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ofv">OFV</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="dofv"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Δ</mi></mrow><annotation encoding="application/x-tex">\Delta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Δ</span></span></span></span>OFV</span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="pvalue">p-value</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run001</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Base model</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>6</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>1.98</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-103.299</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run001</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Adding COV step, unfixing eps(2)</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>8</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>29.6</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-103.468</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-0.169</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>0.919 (df = 2)</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Jittering initial estimates</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>9</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>6.17</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-109.826</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-6.358</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>0.0117 (df = 1)</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003b1</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Updating run003 to 003b1 with jittered params. Adding WT on V</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>10</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-108.889</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>0.937</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>1 (df = 1)</span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> OFV = Objective Function Value; ΔOFV = change in OFV from reference model;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> Cond. No. = Condition Number; p-value from LRT (Likelihood Ratio Test); df =</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="8"> degrees of freedom</td>
    </tr>
  </tfoot>
</table>
</div>
