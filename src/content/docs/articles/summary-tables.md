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

<div id="tzsfirgfua" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#tzsfirgfua table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#tzsfirgfua thead, #tzsfirgfua tbody, #tzsfirgfua tfoot, #tzsfirgfua tr, #tzsfirgfua td, #tzsfirgfua th {
  border-style: none;
}
&#10;#tzsfirgfua p {
  margin: 0;
  padding: 0;
}
&#10;#tzsfirgfua .gt_table {
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
&#10;#tzsfirgfua .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#tzsfirgfua .gt_title {
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
&#10;#tzsfirgfua .gt_subtitle {
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
&#10;#tzsfirgfua .gt_heading {
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
&#10;#tzsfirgfua .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_col_headings {
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
&#10;#tzsfirgfua .gt_col_heading {
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
&#10;#tzsfirgfua .gt_column_spanner_outer {
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
&#10;#tzsfirgfua .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#tzsfirgfua .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#tzsfirgfua .gt_column_spanner {
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
&#10;#tzsfirgfua .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#tzsfirgfua .gt_group_heading {
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
&#10;#tzsfirgfua .gt_empty_group_heading {
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
&#10;#tzsfirgfua .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#tzsfirgfua .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#tzsfirgfua .gt_row {
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
&#10;#tzsfirgfua .gt_stub {
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
&#10;#tzsfirgfua .gt_stub_row_group {
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
&#10;#tzsfirgfua .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#tzsfirgfua .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#tzsfirgfua .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tzsfirgfua .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#tzsfirgfua .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tzsfirgfua .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#tzsfirgfua .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#tzsfirgfua .gt_footnotes {
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
&#10;#tzsfirgfua .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tzsfirgfua .gt_sourcenotes {
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
&#10;#tzsfirgfua .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#tzsfirgfua .gt_left {
  text-align: left;
}
&#10;#tzsfirgfua .gt_center {
  text-align: center;
}
&#10;#tzsfirgfua .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#tzsfirgfua .gt_font_normal {
  font-weight: normal;
}
&#10;#tzsfirgfua .gt_font_bold {
  font-weight: bold;
}
&#10;#tzsfirgfua .gt_font_italic {
  font-style: italic;
}
&#10;#tzsfirgfua .gt_super {
  font-size: 65%;
}
&#10;#tzsfirgfua .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#tzsfirgfua .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#tzsfirgfua .gt_indent_1 {
  text-indent: 5px;
}
&#10;#tzsfirgfua .gt_indent_2 {
  text-indent: 10px;
}
&#10;#tzsfirgfua .gt_indent_3 {
  text-indent: 15px;
}
&#10;#tzsfirgfua .gt_indent_4 {
  text-indent: 20px;
}
&#10;#tzsfirgfua .gt_indent_5 {
  text-indent: 25px;
}
&#10;#tzsfirgfua .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#tzsfirgfua div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="jsiqceopjk" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#jsiqceopjk table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#jsiqceopjk thead, #jsiqceopjk tbody, #jsiqceopjk tfoot, #jsiqceopjk tr, #jsiqceopjk td, #jsiqceopjk th {
  border-style: none;
}
&#10;#jsiqceopjk p {
  margin: 0;
  padding: 0;
}
&#10;#jsiqceopjk .gt_table {
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
&#10;#jsiqceopjk .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#jsiqceopjk .gt_title {
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
&#10;#jsiqceopjk .gt_subtitle {
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
&#10;#jsiqceopjk .gt_heading {
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
&#10;#jsiqceopjk .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_col_headings {
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
&#10;#jsiqceopjk .gt_col_heading {
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
&#10;#jsiqceopjk .gt_column_spanner_outer {
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
&#10;#jsiqceopjk .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#jsiqceopjk .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#jsiqceopjk .gt_column_spanner {
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
&#10;#jsiqceopjk .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#jsiqceopjk .gt_group_heading {
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
&#10;#jsiqceopjk .gt_empty_group_heading {
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
&#10;#jsiqceopjk .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#jsiqceopjk .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#jsiqceopjk .gt_row {
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
&#10;#jsiqceopjk .gt_stub {
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
&#10;#jsiqceopjk .gt_stub_row_group {
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
&#10;#jsiqceopjk .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#jsiqceopjk .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#jsiqceopjk .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jsiqceopjk .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#jsiqceopjk .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jsiqceopjk .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#jsiqceopjk .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#jsiqceopjk .gt_footnotes {
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
&#10;#jsiqceopjk .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jsiqceopjk .gt_sourcenotes {
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
&#10;#jsiqceopjk .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#jsiqceopjk .gt_left {
  text-align: left;
}
&#10;#jsiqceopjk .gt_center {
  text-align: center;
}
&#10;#jsiqceopjk .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#jsiqceopjk .gt_font_normal {
  font-weight: normal;
}
&#10;#jsiqceopjk .gt_font_bold {
  font-weight: bold;
}
&#10;#jsiqceopjk .gt_font_italic {
  font-style: italic;
}
&#10;#jsiqceopjk .gt_super {
  font-size: 65%;
}
&#10;#jsiqceopjk .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#jsiqceopjk .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#jsiqceopjk .gt_indent_1 {
  text-indent: 5px;
}
&#10;#jsiqceopjk .gt_indent_2 {
  text-indent: 10px;
}
&#10;#jsiqceopjk .gt_indent_3 {
  text-indent: 15px;
}
&#10;#jsiqceopjk .gt_indent_4 {
  text-indent: 20px;
}
&#10;#jsiqceopjk .gt_indent_5 {
  text-indent: 25px;
}
&#10;#jsiqceopjk .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#jsiqceopjk div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="ifxhdmdjhz" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#ifxhdmdjhz table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#ifxhdmdjhz thead, #ifxhdmdjhz tbody, #ifxhdmdjhz tfoot, #ifxhdmdjhz tr, #ifxhdmdjhz td, #ifxhdmdjhz th {
  border-style: none;
}
&#10;#ifxhdmdjhz p {
  margin: 0;
  padding: 0;
}
&#10;#ifxhdmdjhz .gt_table {
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
&#10;#ifxhdmdjhz .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#ifxhdmdjhz .gt_title {
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
&#10;#ifxhdmdjhz .gt_subtitle {
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
&#10;#ifxhdmdjhz .gt_heading {
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
&#10;#ifxhdmdjhz .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_col_headings {
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
&#10;#ifxhdmdjhz .gt_col_heading {
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
&#10;#ifxhdmdjhz .gt_column_spanner_outer {
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
&#10;#ifxhdmdjhz .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#ifxhdmdjhz .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#ifxhdmdjhz .gt_column_spanner {
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
&#10;#ifxhdmdjhz .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#ifxhdmdjhz .gt_group_heading {
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
&#10;#ifxhdmdjhz .gt_empty_group_heading {
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
&#10;#ifxhdmdjhz .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#ifxhdmdjhz .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#ifxhdmdjhz .gt_row {
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
&#10;#ifxhdmdjhz .gt_stub {
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
&#10;#ifxhdmdjhz .gt_stub_row_group {
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
&#10;#ifxhdmdjhz .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#ifxhdmdjhz .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#ifxhdmdjhz .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ifxhdmdjhz .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#ifxhdmdjhz .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ifxhdmdjhz .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#ifxhdmdjhz .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#ifxhdmdjhz .gt_footnotes {
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
&#10;#ifxhdmdjhz .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ifxhdmdjhz .gt_sourcenotes {
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
&#10;#ifxhdmdjhz .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#ifxhdmdjhz .gt_left {
  text-align: left;
}
&#10;#ifxhdmdjhz .gt_center {
  text-align: center;
}
&#10;#ifxhdmdjhz .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#ifxhdmdjhz .gt_font_normal {
  font-weight: normal;
}
&#10;#ifxhdmdjhz .gt_font_bold {
  font-weight: bold;
}
&#10;#ifxhdmdjhz .gt_font_italic {
  font-style: italic;
}
&#10;#ifxhdmdjhz .gt_super {
  font-size: 65%;
}
&#10;#ifxhdmdjhz .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#ifxhdmdjhz .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#ifxhdmdjhz .gt_indent_1 {
  text-indent: 5px;
}
&#10;#ifxhdmdjhz .gt_indent_2 {
  text-indent: 10px;
}
&#10;#ifxhdmdjhz .gt_indent_3 {
  text-indent: 15px;
}
&#10;#ifxhdmdjhz .gt_indent_4 {
  text-indent: 20px;
}
&#10;#ifxhdmdjhz .gt_indent_5 {
  text-indent: 25px;
}
&#10;#ifxhdmdjhz .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#ifxhdmdjhz div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="klwncboxos" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#klwncboxos table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#klwncboxos thead, #klwncboxos tbody, #klwncboxos tfoot, #klwncboxos tr, #klwncboxos td, #klwncboxos th {
  border-style: none;
}
&#10;#klwncboxos p {
  margin: 0;
  padding: 0;
}
&#10;#klwncboxos .gt_table {
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
&#10;#klwncboxos .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#klwncboxos .gt_title {
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
&#10;#klwncboxos .gt_subtitle {
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
&#10;#klwncboxos .gt_heading {
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
&#10;#klwncboxos .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#klwncboxos .gt_col_headings {
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
&#10;#klwncboxos .gt_col_heading {
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
&#10;#klwncboxos .gt_column_spanner_outer {
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
&#10;#klwncboxos .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#klwncboxos .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#klwncboxos .gt_column_spanner {
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
&#10;#klwncboxos .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#klwncboxos .gt_group_heading {
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
&#10;#klwncboxos .gt_empty_group_heading {
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
&#10;#klwncboxos .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#klwncboxos .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#klwncboxos .gt_row {
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
&#10;#klwncboxos .gt_stub {
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
&#10;#klwncboxos .gt_stub_row_group {
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
&#10;#klwncboxos .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#klwncboxos .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#klwncboxos .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#klwncboxos .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#klwncboxos .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#klwncboxos .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#klwncboxos .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#klwncboxos .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#klwncboxos .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#klwncboxos .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#klwncboxos .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#klwncboxos .gt_footnotes {
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
&#10;#klwncboxos .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#klwncboxos .gt_sourcenotes {
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
&#10;#klwncboxos .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#klwncboxos .gt_left {
  text-align: left;
}
&#10;#klwncboxos .gt_center {
  text-align: center;
}
&#10;#klwncboxos .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#klwncboxos .gt_font_normal {
  font-weight: normal;
}
&#10;#klwncboxos .gt_font_bold {
  font-weight: bold;
}
&#10;#klwncboxos .gt_font_italic {
  font-style: italic;
}
&#10;#klwncboxos .gt_super {
  font-size: 65%;
}
&#10;#klwncboxos .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#klwncboxos .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#klwncboxos .gt_indent_1 {
  text-indent: 5px;
}
&#10;#klwncboxos .gt_indent_2 {
  text-indent: 10px;
}
&#10;#klwncboxos .gt_indent_3 {
  text-indent: 15px;
}
&#10;#klwncboxos .gt_indent_4 {
  text-indent: 20px;
}
&#10;#klwncboxos .gt_indent_5 {
  text-indent: 25px;
}
&#10;#klwncboxos .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#klwncboxos div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="lziqqyurdu" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#lziqqyurdu table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#lziqqyurdu thead, #lziqqyurdu tbody, #lziqqyurdu tfoot, #lziqqyurdu tr, #lziqqyurdu td, #lziqqyurdu th {
  border-style: none;
}
&#10;#lziqqyurdu p {
  margin: 0;
  padding: 0;
}
&#10;#lziqqyurdu .gt_table {
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
&#10;#lziqqyurdu .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#lziqqyurdu .gt_title {
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
&#10;#lziqqyurdu .gt_subtitle {
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
&#10;#lziqqyurdu .gt_heading {
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
&#10;#lziqqyurdu .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_col_headings {
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
&#10;#lziqqyurdu .gt_col_heading {
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
&#10;#lziqqyurdu .gt_column_spanner_outer {
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
&#10;#lziqqyurdu .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#lziqqyurdu .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#lziqqyurdu .gt_column_spanner {
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
&#10;#lziqqyurdu .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#lziqqyurdu .gt_group_heading {
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
&#10;#lziqqyurdu .gt_empty_group_heading {
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
&#10;#lziqqyurdu .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#lziqqyurdu .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#lziqqyurdu .gt_row {
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
&#10;#lziqqyurdu .gt_stub {
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
&#10;#lziqqyurdu .gt_stub_row_group {
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
&#10;#lziqqyurdu .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#lziqqyurdu .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#lziqqyurdu .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#lziqqyurdu .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#lziqqyurdu .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#lziqqyurdu .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#lziqqyurdu .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#lziqqyurdu .gt_footnotes {
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
&#10;#lziqqyurdu .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#lziqqyurdu .gt_sourcenotes {
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
&#10;#lziqqyurdu .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#lziqqyurdu .gt_left {
  text-align: left;
}
&#10;#lziqqyurdu .gt_center {
  text-align: center;
}
&#10;#lziqqyurdu .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#lziqqyurdu .gt_font_normal {
  font-weight: normal;
}
&#10;#lziqqyurdu .gt_font_bold {
  font-weight: bold;
}
&#10;#lziqqyurdu .gt_font_italic {
  font-style: italic;
}
&#10;#lziqqyurdu .gt_super {
  font-size: 65%;
}
&#10;#lziqqyurdu .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#lziqqyurdu .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#lziqqyurdu .gt_indent_1 {
  text-indent: 5px;
}
&#10;#lziqqyurdu .gt_indent_2 {
  text-indent: 10px;
}
&#10;#lziqqyurdu .gt_indent_3 {
  text-indent: 15px;
}
&#10;#lziqqyurdu .gt_indent_4 {
  text-indent: 20px;
}
&#10;#lziqqyurdu .gt_indent_5 {
  text-indent: 25px;
}
&#10;#lziqqyurdu .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#lziqqyurdu div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="mudqmrinle" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#mudqmrinle table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#mudqmrinle thead, #mudqmrinle tbody, #mudqmrinle tfoot, #mudqmrinle tr, #mudqmrinle td, #mudqmrinle th {
  border-style: none;
}
&#10;#mudqmrinle p {
  margin: 0;
  padding: 0;
}
&#10;#mudqmrinle .gt_table {
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
&#10;#mudqmrinle .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#mudqmrinle .gt_title {
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
&#10;#mudqmrinle .gt_subtitle {
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
&#10;#mudqmrinle .gt_heading {
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
&#10;#mudqmrinle .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_col_headings {
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
&#10;#mudqmrinle .gt_col_heading {
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
&#10;#mudqmrinle .gt_column_spanner_outer {
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
&#10;#mudqmrinle .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#mudqmrinle .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#mudqmrinle .gt_column_spanner {
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
&#10;#mudqmrinle .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#mudqmrinle .gt_group_heading {
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
&#10;#mudqmrinle .gt_empty_group_heading {
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
&#10;#mudqmrinle .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#mudqmrinle .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#mudqmrinle .gt_row {
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
&#10;#mudqmrinle .gt_stub {
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
&#10;#mudqmrinle .gt_stub_row_group {
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
&#10;#mudqmrinle .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#mudqmrinle .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#mudqmrinle .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mudqmrinle .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#mudqmrinle .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mudqmrinle .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#mudqmrinle .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#mudqmrinle .gt_footnotes {
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
&#10;#mudqmrinle .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mudqmrinle .gt_sourcenotes {
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
&#10;#mudqmrinle .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#mudqmrinle .gt_left {
  text-align: left;
}
&#10;#mudqmrinle .gt_center {
  text-align: center;
}
&#10;#mudqmrinle .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#mudqmrinle .gt_font_normal {
  font-weight: normal;
}
&#10;#mudqmrinle .gt_font_bold {
  font-weight: bold;
}
&#10;#mudqmrinle .gt_font_italic {
  font-style: italic;
}
&#10;#mudqmrinle .gt_super {
  font-size: 65%;
}
&#10;#mudqmrinle .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#mudqmrinle .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#mudqmrinle .gt_indent_1 {
  text-indent: 5px;
}
&#10;#mudqmrinle .gt_indent_2 {
  text-indent: 10px;
}
&#10;#mudqmrinle .gt_indent_3 {
  text-indent: 15px;
}
&#10;#mudqmrinle .gt_indent_4 {
  text-indent: 20px;
}
&#10;#mudqmrinle .gt_indent_5 {
  text-indent: 25px;
}
&#10;#mudqmrinle .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#mudqmrinle div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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

<div id="iiubkhnleb" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#iiubkhnleb table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#iiubkhnleb thead, #iiubkhnleb tbody, #iiubkhnleb tfoot, #iiubkhnleb tr, #iiubkhnleb td, #iiubkhnleb th {
  border-style: none;
}
&#10;#iiubkhnleb p {
  margin: 0;
  padding: 0;
}
&#10;#iiubkhnleb .gt_table {
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
&#10;#iiubkhnleb .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#iiubkhnleb .gt_title {
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
&#10;#iiubkhnleb .gt_subtitle {
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
&#10;#iiubkhnleb .gt_heading {
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
&#10;#iiubkhnleb .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_col_headings {
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
&#10;#iiubkhnleb .gt_col_heading {
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
&#10;#iiubkhnleb .gt_column_spanner_outer {
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
&#10;#iiubkhnleb .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#iiubkhnleb .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#iiubkhnleb .gt_column_spanner {
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
&#10;#iiubkhnleb .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#iiubkhnleb .gt_group_heading {
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
&#10;#iiubkhnleb .gt_empty_group_heading {
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
&#10;#iiubkhnleb .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#iiubkhnleb .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#iiubkhnleb .gt_row {
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
&#10;#iiubkhnleb .gt_stub {
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
&#10;#iiubkhnleb .gt_stub_row_group {
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
&#10;#iiubkhnleb .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#iiubkhnleb .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#iiubkhnleb .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iiubkhnleb .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#iiubkhnleb .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iiubkhnleb .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#iiubkhnleb .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#iiubkhnleb .gt_footnotes {
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
&#10;#iiubkhnleb .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iiubkhnleb .gt_sourcenotes {
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
&#10;#iiubkhnleb .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#iiubkhnleb .gt_left {
  text-align: left;
}
&#10;#iiubkhnleb .gt_center {
  text-align: center;
}
&#10;#iiubkhnleb .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#iiubkhnleb .gt_font_normal {
  font-weight: normal;
}
&#10;#iiubkhnleb .gt_font_bold {
  font-weight: bold;
}
&#10;#iiubkhnleb .gt_font_italic {
  font-style: italic;
}
&#10;#iiubkhnleb .gt_super {
  font-size: 65%;
}
&#10;#iiubkhnleb .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#iiubkhnleb .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#iiubkhnleb .gt_indent_1 {
  text-indent: 5px;
}
&#10;#iiubkhnleb .gt_indent_2 {
  text-indent: 10px;
}
&#10;#iiubkhnleb .gt_indent_3 {
  text-indent: 15px;
}
&#10;#iiubkhnleb .gt_indent_4 {
  text-indent: 20px;
}
&#10;#iiubkhnleb .gt_indent_5 {
  text-indent: 25px;
}
&#10;#iiubkhnleb .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#iiubkhnleb div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
