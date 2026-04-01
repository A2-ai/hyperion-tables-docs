---
title: "Summary Tables"
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
  - <span style="color:green">run004</span> <span style="color:gray">-
    Updating run001 to run004 with jittered params …</span>

Create a summary table with default columns:

``` r
tree |>
  apply_summary_spec(SummarySpec()) |>
  make_summary_table()
```

<div id="pqqayrmdmn" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#pqqayrmdmn table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#pqqayrmdmn thead, #pqqayrmdmn tbody, #pqqayrmdmn tfoot, #pqqayrmdmn tr, #pqqayrmdmn td, #pqqayrmdmn th {
  border-style: none;
}
&#10;#pqqayrmdmn p {
  margin: 0;
  padding: 0;
}
&#10;#pqqayrmdmn .gt_table {
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
&#10;#pqqayrmdmn .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#pqqayrmdmn .gt_title {
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
&#10;#pqqayrmdmn .gt_subtitle {
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
&#10;#pqqayrmdmn .gt_heading {
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
&#10;#pqqayrmdmn .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_col_headings {
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
&#10;#pqqayrmdmn .gt_col_heading {
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
&#10;#pqqayrmdmn .gt_column_spanner_outer {
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
&#10;#pqqayrmdmn .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#pqqayrmdmn .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#pqqayrmdmn .gt_column_spanner {
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
&#10;#pqqayrmdmn .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#pqqayrmdmn .gt_group_heading {
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
&#10;#pqqayrmdmn .gt_empty_group_heading {
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
&#10;#pqqayrmdmn .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#pqqayrmdmn .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#pqqayrmdmn .gt_row {
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
&#10;#pqqayrmdmn .gt_stub {
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
&#10;#pqqayrmdmn .gt_stub_row_group {
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
&#10;#pqqayrmdmn .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#pqqayrmdmn .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#pqqayrmdmn .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#pqqayrmdmn .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#pqqayrmdmn .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#pqqayrmdmn .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#pqqayrmdmn .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#pqqayrmdmn .gt_footnotes {
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
&#10;#pqqayrmdmn .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#pqqayrmdmn .gt_sourcenotes {
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
&#10;#pqqayrmdmn .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#pqqayrmdmn .gt_left {
  text-align: left;
}
&#10;#pqqayrmdmn .gt_center {
  text-align: center;
}
&#10;#pqqayrmdmn .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#pqqayrmdmn .gt_font_normal {
  font-weight: normal;
}
&#10;#pqqayrmdmn .gt_font_bold {
  font-weight: bold;
}
&#10;#pqqayrmdmn .gt_font_italic {
  font-style: italic;
}
&#10;#pqqayrmdmn .gt_super {
  font-size: 65%;
}
&#10;#pqqayrmdmn .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#pqqayrmdmn .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#pqqayrmdmn .gt_indent_1 {
  text-indent: 5px;
}
&#10;#pqqayrmdmn .gt_indent_2 {
  text-indent: 10px;
}
&#10;#pqqayrmdmn .gt_indent_3 {
  text-indent: 15px;
}
&#10;#pqqayrmdmn .gt_indent_4 {
  text-indent: 20px;
}
&#10;#pqqayrmdmn .gt_indent_5 {
  text-indent: 25px;
}
&#10;#pqqayrmdmn .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#pqqayrmdmn div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="gnhyvgbmtn" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#gnhyvgbmtn table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#gnhyvgbmtn thead, #gnhyvgbmtn tbody, #gnhyvgbmtn tfoot, #gnhyvgbmtn tr, #gnhyvgbmtn td, #gnhyvgbmtn th {
  border-style: none;
}
&#10;#gnhyvgbmtn p {
  margin: 0;
  padding: 0;
}
&#10;#gnhyvgbmtn .gt_table {
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
&#10;#gnhyvgbmtn .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#gnhyvgbmtn .gt_title {
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
&#10;#gnhyvgbmtn .gt_subtitle {
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
&#10;#gnhyvgbmtn .gt_heading {
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
&#10;#gnhyvgbmtn .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_col_headings {
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
&#10;#gnhyvgbmtn .gt_col_heading {
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
&#10;#gnhyvgbmtn .gt_column_spanner_outer {
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
&#10;#gnhyvgbmtn .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#gnhyvgbmtn .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#gnhyvgbmtn .gt_column_spanner {
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
&#10;#gnhyvgbmtn .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#gnhyvgbmtn .gt_group_heading {
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
&#10;#gnhyvgbmtn .gt_empty_group_heading {
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
&#10;#gnhyvgbmtn .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#gnhyvgbmtn .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#gnhyvgbmtn .gt_row {
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
&#10;#gnhyvgbmtn .gt_stub {
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
&#10;#gnhyvgbmtn .gt_stub_row_group {
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
&#10;#gnhyvgbmtn .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#gnhyvgbmtn .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#gnhyvgbmtn .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gnhyvgbmtn .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#gnhyvgbmtn .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gnhyvgbmtn .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#gnhyvgbmtn .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gnhyvgbmtn .gt_footnotes {
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
&#10;#gnhyvgbmtn .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gnhyvgbmtn .gt_sourcenotes {
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
&#10;#gnhyvgbmtn .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gnhyvgbmtn .gt_left {
  text-align: left;
}
&#10;#gnhyvgbmtn .gt_center {
  text-align: center;
}
&#10;#gnhyvgbmtn .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#gnhyvgbmtn .gt_font_normal {
  font-weight: normal;
}
&#10;#gnhyvgbmtn .gt_font_bold {
  font-weight: bold;
}
&#10;#gnhyvgbmtn .gt_font_italic {
  font-style: italic;
}
&#10;#gnhyvgbmtn .gt_super {
  font-size: 65%;
}
&#10;#gnhyvgbmtn .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#gnhyvgbmtn .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#gnhyvgbmtn .gt_indent_1 {
  text-indent: 5px;
}
&#10;#gnhyvgbmtn .gt_indent_2 {
  text-indent: 10px;
}
&#10;#gnhyvgbmtn .gt_indent_3 {
  text-indent: 15px;
}
&#10;#gnhyvgbmtn .gt_indent_4 {
  text-indent: 20px;
}
&#10;#gnhyvgbmtn .gt_indent_5 {
  text-indent: 25px;
}
&#10;#gnhyvgbmtn .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#gnhyvgbmtn div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="ppcuqmzybk" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#ppcuqmzybk table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#ppcuqmzybk thead, #ppcuqmzybk tbody, #ppcuqmzybk tfoot, #ppcuqmzybk tr, #ppcuqmzybk td, #ppcuqmzybk th {
  border-style: none;
}
&#10;#ppcuqmzybk p {
  margin: 0;
  padding: 0;
}
&#10;#ppcuqmzybk .gt_table {
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
&#10;#ppcuqmzybk .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#ppcuqmzybk .gt_title {
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
&#10;#ppcuqmzybk .gt_subtitle {
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
&#10;#ppcuqmzybk .gt_heading {
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
&#10;#ppcuqmzybk .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_col_headings {
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
&#10;#ppcuqmzybk .gt_col_heading {
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
&#10;#ppcuqmzybk .gt_column_spanner_outer {
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
&#10;#ppcuqmzybk .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#ppcuqmzybk .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#ppcuqmzybk .gt_column_spanner {
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
&#10;#ppcuqmzybk .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#ppcuqmzybk .gt_group_heading {
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
&#10;#ppcuqmzybk .gt_empty_group_heading {
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
&#10;#ppcuqmzybk .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#ppcuqmzybk .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#ppcuqmzybk .gt_row {
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
&#10;#ppcuqmzybk .gt_stub {
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
&#10;#ppcuqmzybk .gt_stub_row_group {
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
&#10;#ppcuqmzybk .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#ppcuqmzybk .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#ppcuqmzybk .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ppcuqmzybk .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#ppcuqmzybk .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ppcuqmzybk .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#ppcuqmzybk .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ppcuqmzybk .gt_footnotes {
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
&#10;#ppcuqmzybk .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ppcuqmzybk .gt_sourcenotes {
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
&#10;#ppcuqmzybk .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ppcuqmzybk .gt_left {
  text-align: left;
}
&#10;#ppcuqmzybk .gt_center {
  text-align: center;
}
&#10;#ppcuqmzybk .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#ppcuqmzybk .gt_font_normal {
  font-weight: normal;
}
&#10;#ppcuqmzybk .gt_font_bold {
  font-weight: bold;
}
&#10;#ppcuqmzybk .gt_font_italic {
  font-style: italic;
}
&#10;#ppcuqmzybk .gt_super {
  font-size: 65%;
}
&#10;#ppcuqmzybk .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#ppcuqmzybk .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#ppcuqmzybk .gt_indent_1 {
  text-indent: 5px;
}
&#10;#ppcuqmzybk .gt_indent_2 {
  text-indent: 10px;
}
&#10;#ppcuqmzybk .gt_indent_3 {
  text-indent: 15px;
}
&#10;#ppcuqmzybk .gt_indent_4 {
  text-indent: 20px;
}
&#10;#ppcuqmzybk .gt_indent_5 {
  text-indent: 25px;
}
&#10;#ppcuqmzybk .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#ppcuqmzybk div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="xbtvvrmzjx" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#xbtvvrmzjx table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#xbtvvrmzjx thead, #xbtvvrmzjx tbody, #xbtvvrmzjx tfoot, #xbtvvrmzjx tr, #xbtvvrmzjx td, #xbtvvrmzjx th {
  border-style: none;
}
&#10;#xbtvvrmzjx p {
  margin: 0;
  padding: 0;
}
&#10;#xbtvvrmzjx .gt_table {
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
&#10;#xbtvvrmzjx .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#xbtvvrmzjx .gt_title {
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
&#10;#xbtvvrmzjx .gt_subtitle {
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
&#10;#xbtvvrmzjx .gt_heading {
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
&#10;#xbtvvrmzjx .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_col_headings {
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
&#10;#xbtvvrmzjx .gt_col_heading {
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
&#10;#xbtvvrmzjx .gt_column_spanner_outer {
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
&#10;#xbtvvrmzjx .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#xbtvvrmzjx .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#xbtvvrmzjx .gt_column_spanner {
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
&#10;#xbtvvrmzjx .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#xbtvvrmzjx .gt_group_heading {
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
&#10;#xbtvvrmzjx .gt_empty_group_heading {
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
&#10;#xbtvvrmzjx .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#xbtvvrmzjx .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#xbtvvrmzjx .gt_row {
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
&#10;#xbtvvrmzjx .gt_stub {
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
&#10;#xbtvvrmzjx .gt_stub_row_group {
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
&#10;#xbtvvrmzjx .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#xbtvvrmzjx .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#xbtvvrmzjx .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xbtvvrmzjx .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#xbtvvrmzjx .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xbtvvrmzjx .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#xbtvvrmzjx .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#xbtvvrmzjx .gt_footnotes {
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
&#10;#xbtvvrmzjx .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xbtvvrmzjx .gt_sourcenotes {
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
&#10;#xbtvvrmzjx .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#xbtvvrmzjx .gt_left {
  text-align: left;
}
&#10;#xbtvvrmzjx .gt_center {
  text-align: center;
}
&#10;#xbtvvrmzjx .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#xbtvvrmzjx .gt_font_normal {
  font-weight: normal;
}
&#10;#xbtvvrmzjx .gt_font_bold {
  font-weight: bold;
}
&#10;#xbtvvrmzjx .gt_font_italic {
  font-style: italic;
}
&#10;#xbtvvrmzjx .gt_super {
  font-size: 65%;
}
&#10;#xbtvvrmzjx .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#xbtvvrmzjx .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#xbtvvrmzjx .gt_indent_1 {
  text-indent: 5px;
}
&#10;#xbtvvrmzjx .gt_indent_2 {
  text-indent: 10px;
}
&#10;#xbtvvrmzjx .gt_indent_3 {
  text-indent: 15px;
}
&#10;#xbtvvrmzjx .gt_indent_4 {
  text-indent: 20px;
}
&#10;#xbtvvrmzjx .gt_indent_5 {
  text-indent: 25px;
}
&#10;#xbtvvrmzjx .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#xbtvvrmzjx div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="wbzotqkcpr" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#wbzotqkcpr table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#wbzotqkcpr thead, #wbzotqkcpr tbody, #wbzotqkcpr tfoot, #wbzotqkcpr tr, #wbzotqkcpr td, #wbzotqkcpr th {
  border-style: none;
}
&#10;#wbzotqkcpr p {
  margin: 0;
  padding: 0;
}
&#10;#wbzotqkcpr .gt_table {
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
&#10;#wbzotqkcpr .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#wbzotqkcpr .gt_title {
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
&#10;#wbzotqkcpr .gt_subtitle {
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
&#10;#wbzotqkcpr .gt_heading {
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
&#10;#wbzotqkcpr .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_col_headings {
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
&#10;#wbzotqkcpr .gt_col_heading {
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
&#10;#wbzotqkcpr .gt_column_spanner_outer {
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
&#10;#wbzotqkcpr .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#wbzotqkcpr .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#wbzotqkcpr .gt_column_spanner {
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
&#10;#wbzotqkcpr .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#wbzotqkcpr .gt_group_heading {
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
&#10;#wbzotqkcpr .gt_empty_group_heading {
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
&#10;#wbzotqkcpr .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#wbzotqkcpr .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#wbzotqkcpr .gt_row {
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
&#10;#wbzotqkcpr .gt_stub {
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
&#10;#wbzotqkcpr .gt_stub_row_group {
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
&#10;#wbzotqkcpr .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#wbzotqkcpr .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#wbzotqkcpr .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#wbzotqkcpr .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#wbzotqkcpr .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#wbzotqkcpr .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#wbzotqkcpr .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#wbzotqkcpr .gt_footnotes {
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
&#10;#wbzotqkcpr .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#wbzotqkcpr .gt_sourcenotes {
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
&#10;#wbzotqkcpr .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#wbzotqkcpr .gt_left {
  text-align: left;
}
&#10;#wbzotqkcpr .gt_center {
  text-align: center;
}
&#10;#wbzotqkcpr .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#wbzotqkcpr .gt_font_normal {
  font-weight: normal;
}
&#10;#wbzotqkcpr .gt_font_bold {
  font-weight: bold;
}
&#10;#wbzotqkcpr .gt_font_italic {
  font-style: italic;
}
&#10;#wbzotqkcpr .gt_super {
  font-size: 65%;
}
&#10;#wbzotqkcpr .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#wbzotqkcpr .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#wbzotqkcpr .gt_indent_1 {
  text-indent: 5px;
}
&#10;#wbzotqkcpr .gt_indent_2 {
  text-indent: 10px;
}
&#10;#wbzotqkcpr .gt_indent_3 {
  text-indent: 15px;
}
&#10;#wbzotqkcpr .gt_indent_4 {
  text-indent: 20px;
}
&#10;#wbzotqkcpr .gt_indent_5 {
  text-indent: 25px;
}
&#10;#wbzotqkcpr .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#wbzotqkcpr div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="aavnefevug" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#aavnefevug table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#aavnefevug thead, #aavnefevug tbody, #aavnefevug tfoot, #aavnefevug tr, #aavnefevug td, #aavnefevug th {
  border-style: none;
}
&#10;#aavnefevug p {
  margin: 0;
  padding: 0;
}
&#10;#aavnefevug .gt_table {
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
&#10;#aavnefevug .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#aavnefevug .gt_title {
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
&#10;#aavnefevug .gt_subtitle {
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
&#10;#aavnefevug .gt_heading {
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
&#10;#aavnefevug .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#aavnefevug .gt_col_headings {
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
&#10;#aavnefevug .gt_col_heading {
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
&#10;#aavnefevug .gt_column_spanner_outer {
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
&#10;#aavnefevug .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#aavnefevug .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#aavnefevug .gt_column_spanner {
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
&#10;#aavnefevug .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#aavnefevug .gt_group_heading {
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
&#10;#aavnefevug .gt_empty_group_heading {
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
&#10;#aavnefevug .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#aavnefevug .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#aavnefevug .gt_row {
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
&#10;#aavnefevug .gt_stub {
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
&#10;#aavnefevug .gt_stub_row_group {
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
&#10;#aavnefevug .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#aavnefevug .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#aavnefevug .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#aavnefevug .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#aavnefevug .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#aavnefevug .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#aavnefevug .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#aavnefevug .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#aavnefevug .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#aavnefevug .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#aavnefevug .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#aavnefevug .gt_footnotes {
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
&#10;#aavnefevug .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#aavnefevug .gt_sourcenotes {
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
&#10;#aavnefevug .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#aavnefevug .gt_left {
  text-align: left;
}
&#10;#aavnefevug .gt_center {
  text-align: center;
}
&#10;#aavnefevug .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#aavnefevug .gt_font_normal {
  font-weight: normal;
}
&#10;#aavnefevug .gt_font_bold {
  font-weight: bold;
}
&#10;#aavnefevug .gt_font_italic {
  font-style: italic;
}
&#10;#aavnefevug .gt_super {
  font-size: 65%;
}
&#10;#aavnefevug .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#aavnefevug .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#aavnefevug .gt_indent_1 {
  text-indent: 5px;
}
&#10;#aavnefevug .gt_indent_2 {
  text-indent: 10px;
}
&#10;#aavnefevug .gt_indent_3 {
  text-indent: 15px;
}
&#10;#aavnefevug .gt_indent_4 {
  text-indent: 20px;
}
&#10;#aavnefevug .gt_indent_5 {
  text-indent: 25px;
}
&#10;#aavnefevug .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#aavnefevug div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="esiytxkyzk" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#esiytxkyzk table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#esiytxkyzk thead, #esiytxkyzk tbody, #esiytxkyzk tfoot, #esiytxkyzk tr, #esiytxkyzk td, #esiytxkyzk th {
  border-style: none;
}
&#10;#esiytxkyzk p {
  margin: 0;
  padding: 0;
}
&#10;#esiytxkyzk .gt_table {
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
&#10;#esiytxkyzk .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#esiytxkyzk .gt_title {
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
&#10;#esiytxkyzk .gt_subtitle {
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
&#10;#esiytxkyzk .gt_heading {
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
&#10;#esiytxkyzk .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_col_headings {
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
&#10;#esiytxkyzk .gt_col_heading {
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
&#10;#esiytxkyzk .gt_column_spanner_outer {
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
&#10;#esiytxkyzk .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#esiytxkyzk .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#esiytxkyzk .gt_column_spanner {
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
&#10;#esiytxkyzk .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#esiytxkyzk .gt_group_heading {
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
&#10;#esiytxkyzk .gt_empty_group_heading {
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
&#10;#esiytxkyzk .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#esiytxkyzk .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#esiytxkyzk .gt_row {
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
&#10;#esiytxkyzk .gt_stub {
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
&#10;#esiytxkyzk .gt_stub_row_group {
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
&#10;#esiytxkyzk .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#esiytxkyzk .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#esiytxkyzk .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#esiytxkyzk .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#esiytxkyzk .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#esiytxkyzk .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#esiytxkyzk .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#esiytxkyzk .gt_footnotes {
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
&#10;#esiytxkyzk .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#esiytxkyzk .gt_sourcenotes {
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
&#10;#esiytxkyzk .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#esiytxkyzk .gt_left {
  text-align: left;
}
&#10;#esiytxkyzk .gt_center {
  text-align: center;
}
&#10;#esiytxkyzk .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#esiytxkyzk .gt_font_normal {
  font-weight: normal;
}
&#10;#esiytxkyzk .gt_font_bold {
  font-weight: bold;
}
&#10;#esiytxkyzk .gt_font_italic {
  font-style: italic;
}
&#10;#esiytxkyzk .gt_super {
  font-size: 65%;
}
&#10;#esiytxkyzk .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#esiytxkyzk .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#esiytxkyzk .gt_indent_1 {
  text-indent: 5px;
}
&#10;#esiytxkyzk .gt_indent_2 {
  text-indent: 10px;
}
&#10;#esiytxkyzk .gt_indent_3 {
  text-indent: 15px;
}
&#10;#esiytxkyzk .gt_indent_4 {
  text-indent: 20px;
}
&#10;#esiytxkyzk .gt_indent_5 {
  text-indent: 25px;
}
&#10;#esiytxkyzk .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#esiytxkyzk div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
