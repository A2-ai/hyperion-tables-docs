---
title: "Summary Tables"
pagefind: true
---

``` r
library(hyperion)
#> 
#> 
#> ── pharos configuration ────────────────────────────────────────────────────────
#> ✔ pharos.toml found: /data/user-homes/matthews/Packages/hyperion.tables/vignettes/pharos.toml
#> ── hyperion options ────────────────────────────────────────────────────────────
#> ✔ hyperion.significant_number_display : 4
#> ── hyperion nonmem object options ──────────────────────────────────────────────
#> ✔ hyperion.nonmem_model.show_included_columns : FALSE
#> ✔ hyperion.nonmem_summary.rse_threshold : 50
#> ✔ hyperion.nonmem_summary.shrinkage_threshold : 30
library(hyperion.tables)

model_dir <- system.file("extdata", "models", "onecmt", package = "hyperion.tables")
```

## Basic Summary Table

Summary tables display model run information across a project. Start by
loading the model lineage tree:

``` r
tree <- get_model_lineage(model_dir)

tree
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
    - <span style="color:green">run002b001</span>
      <span style="color:gray">- Jittering initial sigma estimates,
      using theta/…</span>
    - <span style="color:orange">run003</span>
      <span style="color:gray">- Jittering initial estimates</span>
      - <span style="color:green">run003b1</span>
        <span style="color:gray">- Updating run003 to 003b1 with
        jittered params. …</span>
      - <span style="color:green">run003b2</span>
        <span style="color:gray">- Updating run003 with mod
        object</span>

Create a summary table with default columns:

``` r
tree |>
  apply_summary_spec(SummarySpec()) |>
  make_summary_table()
```

<div id="iqnjmutaoq" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#iqnjmutaoq table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#iqnjmutaoq thead, #iqnjmutaoq tbody, #iqnjmutaoq tfoot, #iqnjmutaoq tr, #iqnjmutaoq td, #iqnjmutaoq th {
  border-style: none;
}
&#10;#iqnjmutaoq p {
  margin: 0;
  padding: 0;
}
&#10;#iqnjmutaoq .gt_table {
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
&#10;#iqnjmutaoq .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#iqnjmutaoq .gt_title {
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
&#10;#iqnjmutaoq .gt_subtitle {
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
&#10;#iqnjmutaoq .gt_heading {
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
&#10;#iqnjmutaoq .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_col_headings {
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
&#10;#iqnjmutaoq .gt_col_heading {
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
&#10;#iqnjmutaoq .gt_column_spanner_outer {
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
&#10;#iqnjmutaoq .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#iqnjmutaoq .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#iqnjmutaoq .gt_column_spanner {
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
&#10;#iqnjmutaoq .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#iqnjmutaoq .gt_group_heading {
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
&#10;#iqnjmutaoq .gt_empty_group_heading {
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
&#10;#iqnjmutaoq .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#iqnjmutaoq .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#iqnjmutaoq .gt_row {
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
&#10;#iqnjmutaoq .gt_stub {
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
&#10;#iqnjmutaoq .gt_stub_row_group {
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
&#10;#iqnjmutaoq .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#iqnjmutaoq .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#iqnjmutaoq .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iqnjmutaoq .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#iqnjmutaoq .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iqnjmutaoq .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#iqnjmutaoq .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iqnjmutaoq .gt_footnotes {
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
&#10;#iqnjmutaoq .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iqnjmutaoq .gt_sourcenotes {
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
&#10;#iqnjmutaoq .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iqnjmutaoq .gt_left {
  text-align: left;
}
&#10;#iqnjmutaoq .gt_center {
  text-align: center;
}
&#10;#iqnjmutaoq .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#iqnjmutaoq .gt_font_normal {
  font-weight: normal;
}
&#10;#iqnjmutaoq .gt_font_bold {
  font-weight: bold;
}
&#10;#iqnjmutaoq .gt_font_italic {
  font-style: italic;
}
&#10;#iqnjmutaoq .gt_super {
  font-size: 65%;
}
&#10;#iqnjmutaoq .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#iqnjmutaoq .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#iqnjmutaoq .gt_indent_1 {
  text-indent: 5px;
}
&#10;#iqnjmutaoq .gt_indent_2 {
  text-indent: 10px;
}
&#10;#iqnjmutaoq .gt_indent_3 {
  text-indent: 15px;
}
&#10;#iqnjmutaoq .gt_indent_4 {
  text-indent: 20px;
}
&#10;#iqnjmutaoq .gt_indent_5 {
  text-indent: 25px;
}
&#10;#iqnjmutaoq .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#iqnjmutaoq div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

## Customizing Columns

Use `set_spec_columns()` to control which columns appear:

``` r
spec <- SummarySpec() |>
  set_spec_columns(
    "description",
    "estimation_method",
    "ofv",
    "dofv",
    "condition_number"
  )

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="mphtpkliim" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#mphtpkliim table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#mphtpkliim thead, #mphtpkliim tbody, #mphtpkliim tfoot, #mphtpkliim tr, #mphtpkliim td, #mphtpkliim th {
  border-style: none;
}
&#10;#mphtpkliim p {
  margin: 0;
  padding: 0;
}
&#10;#mphtpkliim .gt_table {
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
&#10;#mphtpkliim .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#mphtpkliim .gt_title {
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
&#10;#mphtpkliim .gt_subtitle {
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
&#10;#mphtpkliim .gt_heading {
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
&#10;#mphtpkliim .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_col_headings {
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
&#10;#mphtpkliim .gt_col_heading {
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
&#10;#mphtpkliim .gt_column_spanner_outer {
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
&#10;#mphtpkliim .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#mphtpkliim .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#mphtpkliim .gt_column_spanner {
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
&#10;#mphtpkliim .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#mphtpkliim .gt_group_heading {
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
&#10;#mphtpkliim .gt_empty_group_heading {
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
&#10;#mphtpkliim .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#mphtpkliim .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#mphtpkliim .gt_row {
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
&#10;#mphtpkliim .gt_stub {
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
&#10;#mphtpkliim .gt_stub_row_group {
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
&#10;#mphtpkliim .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#mphtpkliim .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#mphtpkliim .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mphtpkliim .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#mphtpkliim .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mphtpkliim .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#mphtpkliim .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mphtpkliim .gt_footnotes {
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
&#10;#mphtpkliim .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mphtpkliim .gt_sourcenotes {
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
&#10;#mphtpkliim .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mphtpkliim .gt_left {
  text-align: left;
}
&#10;#mphtpkliim .gt_center {
  text-align: center;
}
&#10;#mphtpkliim .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#mphtpkliim .gt_font_normal {
  font-weight: normal;
}
&#10;#mphtpkliim .gt_font_bold {
  font-weight: bold;
}
&#10;#mphtpkliim .gt_font_italic {
  font-style: italic;
}
&#10;#mphtpkliim .gt_super {
  font-size: 65%;
}
&#10;#mphtpkliim .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#mphtpkliim .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#mphtpkliim .gt_indent_1 {
  text-indent: 5px;
}
&#10;#mphtpkliim .gt_indent_2 {
  text-indent: 10px;
}
&#10;#mphtpkliim .gt_indent_3 {
  text-indent: 15px;
}
&#10;#mphtpkliim .gt_indent_4 {
  text-indent: 20px;
}
&#10;#mphtpkliim .gt_indent_5 {
  text-indent: 25px;
}
&#10;#mphtpkliim .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#mphtpkliim div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="6" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">Run Summary</td>
    </tr>
    &#10;    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="model">Model</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="description">Description</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="estimation_method">Method</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="ofv">OFV</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="dofv"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">Δ</mi></mrow><annotation encoding="application/x-tex">\Delta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord">Δ</span></span></span></span>OFV</span></th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="font-weight: bold;" scope="col" id="condition_number">Cond. No.</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run001</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Base model</span></td>
<td headers="estimation_method" class="gt_row gt_left"><span class='gt_from_md'>First Order Conditional Estimation with Interaction</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-103.299</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>1.98</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Adding COV step, unfixing eps(2)</span></td>
<td headers="estimation_method" class="gt_row gt_left"><span class='gt_from_md'>First Order Conditional Estimation with Interaction</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-103.468</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-0.169</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>29.6</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Jittering initial estimates</span></td>
<td headers="estimation_method" class="gt_row gt_left"><span class='gt_from_md'>First Order Conditional Estimation with Interaction</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-109.826</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-6.358</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>6.17</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003b1</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Updating run003 to 003b1 with jittered params. Adding WT on V</span></td>
<td headers="estimation_method" class="gt_row gt_left"><span class='gt_from_md'>First Order Conditional Estimation with Interaction</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-108.889</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>0.937</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> Abbreviations:</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> OFV = Objective Function Value; ΔOFV = change in OFV from reference model;</td>
    </tr>
    <tr class="gt_footnotes">
      <td class="gt_footnote" colspan="6"> Cond. No. = Condition Number</td>
    </tr>
  </tfoot>
</table>
</div>

Available columns include: `based_on`, `description`, `n_parameters`,
`problem`, `number_data_records`, `number_subjects`, `number_obs`,
`estimation_method`, `estimation_time`, `covariance_time`, `ofv`,
`dofv`, `condition_number`, `termination_status`, `pvalue`, `df`.

## Filtering Models

Filter to specific models by name:

``` r
spec <- SummarySpec(models_to_include = c("run002", "run003"))

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="rznlmzovbf" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#rznlmzovbf table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#rznlmzovbf thead, #rznlmzovbf tbody, #rznlmzovbf tfoot, #rznlmzovbf tr, #rznlmzovbf td, #rznlmzovbf th {
  border-style: none;
}
&#10;#rznlmzovbf p {
  margin: 0;
  padding: 0;
}
&#10;#rznlmzovbf .gt_table {
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
&#10;#rznlmzovbf .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#rznlmzovbf .gt_title {
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
&#10;#rznlmzovbf .gt_subtitle {
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
&#10;#rznlmzovbf .gt_heading {
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
&#10;#rznlmzovbf .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_col_headings {
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
&#10;#rznlmzovbf .gt_col_heading {
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
&#10;#rznlmzovbf .gt_column_spanner_outer {
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
&#10;#rznlmzovbf .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#rznlmzovbf .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#rznlmzovbf .gt_column_spanner {
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
&#10;#rznlmzovbf .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#rznlmzovbf .gt_group_heading {
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
&#10;#rznlmzovbf .gt_empty_group_heading {
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
&#10;#rznlmzovbf .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#rznlmzovbf .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#rznlmzovbf .gt_row {
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
&#10;#rznlmzovbf .gt_stub {
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
&#10;#rznlmzovbf .gt_stub_row_group {
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
&#10;#rznlmzovbf .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#rznlmzovbf .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#rznlmzovbf .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rznlmzovbf .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#rznlmzovbf .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rznlmzovbf .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#rznlmzovbf .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#rznlmzovbf .gt_footnotes {
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
&#10;#rznlmzovbf .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rznlmzovbf .gt_sourcenotes {
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
&#10;#rznlmzovbf .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#rznlmzovbf .gt_left {
  text-align: left;
}
&#10;#rznlmzovbf .gt_center {
  text-align: center;
}
&#10;#rznlmzovbf .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#rznlmzovbf .gt_font_normal {
  font-weight: normal;
}
&#10;#rznlmzovbf .gt_font_bold {
  font-weight: bold;
}
&#10;#rznlmzovbf .gt_font_italic {
  font-style: italic;
}
&#10;#rznlmzovbf .gt_super {
  font-size: 65%;
}
&#10;#rznlmzovbf .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#rznlmzovbf .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#rznlmzovbf .gt_indent_1 {
  text-indent: 5px;
}
&#10;#rznlmzovbf .gt_indent_2 {
  text-indent: 10px;
}
&#10;#rznlmzovbf .gt_indent_3 {
  text-indent: 15px;
}
&#10;#rznlmzovbf .gt_indent_4 {
  text-indent: 20px;
}
&#10;#rznlmzovbf .gt_indent_5 {
  text-indent: 25px;
}
&#10;#rznlmzovbf .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#rznlmzovbf div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run001</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Adding COV step, unfixing eps(2)</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>8</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>29.6</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-103.468</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Jittering initial estimates</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>9</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>6.17</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-109.826</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-6.358</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>0.0117 (df = 1)</span></td></tr>
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

Or use custom filter rules:

``` r
spec <- SummarySpec() |>
  set_spec_summary_filter(ofv < -104)

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="njqynhnxsc" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#njqynhnxsc table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#njqynhnxsc thead, #njqynhnxsc tbody, #njqynhnxsc tfoot, #njqynhnxsc tr, #njqynhnxsc td, #njqynhnxsc th {
  border-style: none;
}
&#10;#njqynhnxsc p {
  margin: 0;
  padding: 0;
}
&#10;#njqynhnxsc .gt_table {
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
&#10;#njqynhnxsc .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#njqynhnxsc .gt_title {
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
&#10;#njqynhnxsc .gt_subtitle {
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
&#10;#njqynhnxsc .gt_heading {
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
&#10;#njqynhnxsc .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_col_headings {
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
&#10;#njqynhnxsc .gt_col_heading {
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
&#10;#njqynhnxsc .gt_column_spanner_outer {
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
&#10;#njqynhnxsc .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#njqynhnxsc .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#njqynhnxsc .gt_column_spanner {
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
&#10;#njqynhnxsc .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#njqynhnxsc .gt_group_heading {
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
&#10;#njqynhnxsc .gt_empty_group_heading {
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
&#10;#njqynhnxsc .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#njqynhnxsc .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#njqynhnxsc .gt_row {
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
&#10;#njqynhnxsc .gt_stub {
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
&#10;#njqynhnxsc .gt_stub_row_group {
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
&#10;#njqynhnxsc .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#njqynhnxsc .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#njqynhnxsc .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#njqynhnxsc .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#njqynhnxsc .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#njqynhnxsc .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#njqynhnxsc .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#njqynhnxsc .gt_footnotes {
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
&#10;#njqynhnxsc .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#njqynhnxsc .gt_sourcenotes {
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
&#10;#njqynhnxsc .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#njqynhnxsc .gt_left {
  text-align: left;
}
&#10;#njqynhnxsc .gt_center {
  text-align: center;
}
&#10;#njqynhnxsc .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#njqynhnxsc .gt_font_normal {
  font-weight: normal;
}
&#10;#njqynhnxsc .gt_font_bold {
  font-weight: bold;
}
&#10;#njqynhnxsc .gt_font_italic {
  font-style: italic;
}
&#10;#njqynhnxsc .gt_super {
  font-size: 65%;
}
&#10;#njqynhnxsc .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#njqynhnxsc .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#njqynhnxsc .gt_indent_1 {
  text-indent: 5px;
}
&#10;#njqynhnxsc .gt_indent_2 {
  text-indent: 10px;
}
&#10;#njqynhnxsc .gt_indent_3 {
  text-indent: 15px;
}
&#10;#njqynhnxsc .gt_indent_4 {
  text-indent: 20px;
}
&#10;#njqynhnxsc .gt_indent_5 {
  text-indent: 25px;
}
&#10;#njqynhnxsc .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#njqynhnxsc div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

## P-value Formatting

Control p-value display with thresholds or scientific notation:

``` r
spec <- SummarySpec() |>
  set_spec_pvalue(threshold = 0.001)

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="qzshjgmfbl" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#qzshjgmfbl table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#qzshjgmfbl thead, #qzshjgmfbl tbody, #qzshjgmfbl tfoot, #qzshjgmfbl tr, #qzshjgmfbl td, #qzshjgmfbl th {
  border-style: none;
}
&#10;#qzshjgmfbl p {
  margin: 0;
  padding: 0;
}
&#10;#qzshjgmfbl .gt_table {
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
&#10;#qzshjgmfbl .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#qzshjgmfbl .gt_title {
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
&#10;#qzshjgmfbl .gt_subtitle {
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
&#10;#qzshjgmfbl .gt_heading {
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
&#10;#qzshjgmfbl .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_col_headings {
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
&#10;#qzshjgmfbl .gt_col_heading {
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
&#10;#qzshjgmfbl .gt_column_spanner_outer {
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
&#10;#qzshjgmfbl .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#qzshjgmfbl .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#qzshjgmfbl .gt_column_spanner {
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
&#10;#qzshjgmfbl .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#qzshjgmfbl .gt_group_heading {
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
&#10;#qzshjgmfbl .gt_empty_group_heading {
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
&#10;#qzshjgmfbl .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#qzshjgmfbl .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#qzshjgmfbl .gt_row {
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
&#10;#qzshjgmfbl .gt_stub {
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
&#10;#qzshjgmfbl .gt_stub_row_group {
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
&#10;#qzshjgmfbl .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#qzshjgmfbl .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#qzshjgmfbl .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qzshjgmfbl .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#qzshjgmfbl .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qzshjgmfbl .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#qzshjgmfbl .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qzshjgmfbl .gt_footnotes {
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
&#10;#qzshjgmfbl .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qzshjgmfbl .gt_sourcenotes {
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
&#10;#qzshjgmfbl .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qzshjgmfbl .gt_left {
  text-align: left;
}
&#10;#qzshjgmfbl .gt_center {
  text-align: center;
}
&#10;#qzshjgmfbl .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#qzshjgmfbl .gt_font_normal {
  font-weight: normal;
}
&#10;#qzshjgmfbl .gt_font_bold {
  font-weight: bold;
}
&#10;#qzshjgmfbl .gt_font_italic {
  font-style: italic;
}
&#10;#qzshjgmfbl .gt_super {
  font-size: 65%;
}
&#10;#qzshjgmfbl .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#qzshjgmfbl .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#qzshjgmfbl .gt_indent_1 {
  text-indent: 5px;
}
&#10;#qzshjgmfbl .gt_indent_2 {
  text-indent: 10px;
}
&#10;#qzshjgmfbl .gt_indent_3 {
  text-indent: 15px;
}
&#10;#qzshjgmfbl .gt_indent_4 {
  text-indent: 20px;
}
&#10;#qzshjgmfbl .gt_indent_5 {
  text-indent: 25px;
}
&#10;#qzshjgmfbl .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#qzshjgmfbl div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

``` r
spec <- SummarySpec() |>
  set_spec_pvalue(scientific = TRUE)

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="gbryykjbjo" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#gbryykjbjo table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#gbryykjbjo thead, #gbryykjbjo tbody, #gbryykjbjo tfoot, #gbryykjbjo tr, #gbryykjbjo td, #gbryykjbjo th {
  border-style: none;
}
&#10;#gbryykjbjo p {
  margin: 0;
  padding: 0;
}
&#10;#gbryykjbjo .gt_table {
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
&#10;#gbryykjbjo .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#gbryykjbjo .gt_title {
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
&#10;#gbryykjbjo .gt_subtitle {
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
&#10;#gbryykjbjo .gt_heading {
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
&#10;#gbryykjbjo .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_col_headings {
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
&#10;#gbryykjbjo .gt_col_heading {
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
&#10;#gbryykjbjo .gt_column_spanner_outer {
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
&#10;#gbryykjbjo .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#gbryykjbjo .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#gbryykjbjo .gt_column_spanner {
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
&#10;#gbryykjbjo .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#gbryykjbjo .gt_group_heading {
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
&#10;#gbryykjbjo .gt_empty_group_heading {
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
&#10;#gbryykjbjo .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#gbryykjbjo .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#gbryykjbjo .gt_row {
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
&#10;#gbryykjbjo .gt_stub {
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
&#10;#gbryykjbjo .gt_stub_row_group {
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
&#10;#gbryykjbjo .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#gbryykjbjo .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#gbryykjbjo .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gbryykjbjo .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#gbryykjbjo .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gbryykjbjo .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#gbryykjbjo .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gbryykjbjo .gt_footnotes {
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
&#10;#gbryykjbjo .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gbryykjbjo .gt_sourcenotes {
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
&#10;#gbryykjbjo .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gbryykjbjo .gt_left {
  text-align: left;
}
&#10;#gbryykjbjo .gt_center {
  text-align: center;
}
&#10;#gbryykjbjo .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#gbryykjbjo .gt_font_normal {
  font-weight: normal;
}
&#10;#gbryykjbjo .gt_font_bold {
  font-weight: bold;
}
&#10;#gbryykjbjo .gt_font_italic {
  font-style: italic;
}
&#10;#gbryykjbjo .gt_super {
  font-size: 65%;
}
&#10;#gbryykjbjo .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#gbryykjbjo .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#gbryykjbjo .gt_indent_1 {
  text-indent: 5px;
}
&#10;#gbryykjbjo .gt_indent_2 {
  text-indent: 10px;
}
&#10;#gbryykjbjo .gt_indent_3 {
  text-indent: 15px;
}
&#10;#gbryykjbjo .gt_indent_4 {
  text-indent: 20px;
}
&#10;#gbryykjbjo .gt_indent_5 {
  text-indent: 25px;
}
&#10;#gbryykjbjo .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#gbryykjbjo div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>9.19e-01 (df = 2)</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run002</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Jittering initial estimates</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>9</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'>6.17</span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-109.826</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>-6.358</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>1.17e-02 (df = 1)</span></td></tr>
    <tr><td headers="model" class="gt_row gt_left"><span class='gt_from_md'>run003b1</span></td>
<td headers="based_on" class="gt_row gt_left"><span class='gt_from_md'>run003</span></td>
<td headers="description" class="gt_row gt_left"><span class='gt_from_md'>Updating run003 to 003b1 with jittered params. Adding WT on V</span></td>
<td headers="n_parameters" class="gt_row gt_right"><span class='gt_from_md'>10</span></td>
<td headers="condition_number" class="gt_row gt_right"><span class='gt_from_md'></span></td>
<td headers="ofv" class="gt_row gt_right"><span class='gt_from_md'>-108.889</span></td>
<td headers="dofv" class="gt_row gt_right"><span class='gt_from_md'>0.937</span></td>
<td headers="pvalue" class="gt_row gt_left"><span class='gt_from_md'>1e+00 (df = 1)</span></td></tr>
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

## Table Title

``` r
spec <- SummarySpec() |>
  set_spec_title("PK Model Development Summary")

tree |>
  apply_summary_spec(spec) |>
  make_summary_table()
```

<div id="mpmbouwkym" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#mpmbouwkym table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#mpmbouwkym thead, #mpmbouwkym tbody, #mpmbouwkym tfoot, #mpmbouwkym tr, #mpmbouwkym td, #mpmbouwkym th {
  border-style: none;
}
&#10;#mpmbouwkym p {
  margin: 0;
  padding: 0;
}
&#10;#mpmbouwkym .gt_table {
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
&#10;#mpmbouwkym .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#mpmbouwkym .gt_title {
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
&#10;#mpmbouwkym .gt_subtitle {
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
&#10;#mpmbouwkym .gt_heading {
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
&#10;#mpmbouwkym .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_col_headings {
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
&#10;#mpmbouwkym .gt_col_heading {
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
&#10;#mpmbouwkym .gt_column_spanner_outer {
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
&#10;#mpmbouwkym .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#mpmbouwkym .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#mpmbouwkym .gt_column_spanner {
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
&#10;#mpmbouwkym .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#mpmbouwkym .gt_group_heading {
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
&#10;#mpmbouwkym .gt_empty_group_heading {
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
&#10;#mpmbouwkym .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#mpmbouwkym .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#mpmbouwkym .gt_row {
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
&#10;#mpmbouwkym .gt_stub {
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
&#10;#mpmbouwkym .gt_stub_row_group {
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
&#10;#mpmbouwkym .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#mpmbouwkym .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#mpmbouwkym .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mpmbouwkym .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#mpmbouwkym .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mpmbouwkym .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#mpmbouwkym .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mpmbouwkym .gt_footnotes {
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
&#10;#mpmbouwkym .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mpmbouwkym .gt_sourcenotes {
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
&#10;#mpmbouwkym .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mpmbouwkym .gt_left {
  text-align: left;
}
&#10;#mpmbouwkym .gt_center {
  text-align: center;
}
&#10;#mpmbouwkym .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#mpmbouwkym .gt_font_normal {
  font-weight: normal;
}
&#10;#mpmbouwkym .gt_font_bold {
  font-weight: bold;
}
&#10;#mpmbouwkym .gt_font_italic {
  font-style: italic;
}
&#10;#mpmbouwkym .gt_super {
  font-size: 65%;
}
&#10;#mpmbouwkym .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#mpmbouwkym .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#mpmbouwkym .gt_indent_1 {
  text-indent: 5px;
}
&#10;#mpmbouwkym .gt_indent_2 {
  text-indent: 10px;
}
&#10;#mpmbouwkym .gt_indent_3 {
  text-indent: 15px;
}
&#10;#mpmbouwkym .gt_indent_4 {
  text-indent: 20px;
}
&#10;#mpmbouwkym .gt_indent_5 {
  text-indent: 25px;
}
&#10;#mpmbouwkym .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#mpmbouwkym div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
&#10;td, th {
  white-space: nowrap;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="8" class="gt_heading gt_title gt_font_normal gt_bottom_border" style="font-weight: bold;">PK Model Development Summary</td>
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
