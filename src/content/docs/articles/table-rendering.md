---
title: "Table Rendering"
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

data_dir <- system.file("extdata", package = "hyperion.tables")
model_dir <- file.path(data_dir, "models", "onecmt")
model_run <- "run003"
```

## Rendering and extending tables

`hyperion.tables` renders tables through a renderer-agnostic
intermediate called `HyperionTable`. The table data is produced once
from a `TableSpec`, then any renderer (gt/flextable/custom) can format
and display it consistently.

Renderers call `apply_formatting()` internally, so the same rendering
rules apply across outputs.

## Pipeline overview

Here’s what happens when you run:

    params |>
      apply_table_spec(spec, info) |>
      add_summary_info(mod_sum) |>
      make_parameter_table()

1.  **`apply_table_spec()`** enriches the raw parameter data with
    transforms, CI bounds, section labels, and attaches `table_spec`. It
    does *not* create display strings.
2.  **`add_summary_info()`** attaches model summary metadata for
    footnotes.
3.  **`make_parameter_table()`** builds a `HyperionTable`, which
    captures labels, hide/show rules, CI merge specs, footnotes, and
    other display intent.
4.  **`render_to_gt()` / `render_to_flextable()`** call
    `apply_formatting()` to:
    - format numeric columns
    - build the variability display column (if requested)
    - merge CI bounds (if enabled)
    - apply missing-value text

This keeps formatting centralized and consistent across renderers while
keeping the underlying data pipeline clean and composable.

## Build a `HyperionTable` and render it

Render rules live on `TableSpec`:

- `ci` controls CI merging and missing-value display.
- `n_sigfig` controls numeric precision.
- `missing_text` + `missing_apply_to` control `NA` substitution.

``` r
spec <- TableSpec(
  sections = section_rules(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual error",
    TRUE ~ "Other"
  ),
  title = paste(model_run, "Parameters")
)

run003 <- read_model(file.path(model_dir, paste0(model_run, ".mod")))

hyperion_table <- get_parameters(run003) |>
  apply_table_spec(spec, get_model_parameter_info(run003)) |>
  make_parameter_table(output = "data")

hyperion_table
#> <hyperion.tables::HyperionTable>
#>  @ data            :'data.frame':    9 obs. of  19 variables:
#>  .. $ name         : chr  "TVCL" "TVV" "TVKA" "OM1 TVCL" ...
#>  .. $ symbol       : chr  "$\\theta_{1}$" "$\\theta_{2}$" "$\\theta_{3}$" "$\\exp(\\Omega_{(1,1)})$" ...
#>  .. $ unit         : chr  "L/hr" "L" "1/hr" NA ...
#>  .. $ estimate     : num  1.33 40.16 1.21 1.13 1.13 ...
#>  .. $ variability  : chr  NA NA NA NA ...
#>  .. $ ci_low       : num  1.107 34.598 0.997 1.024 1.053 ...
#>  .. $ ci_high      : num  1.54 45.73 1.43 1.25 1.22 ...
#>  .. $ rse          : num  8.41 7.07 9.06 41.16 29.66 ...
#>  .. $ shrinkage    : num  NA NA NA 13.14 4.63 ...
#>  .. $ fixed        : logi  FALSE FALSE FALSE FALSE FALSE FALSE ...
#>  .. $ section      : Factor w/ 5 levels "Structural model parameters",..: 1 1 1 2 2 2 3 4 4
#>  .. $ kind         : chr  "THETA" "THETA" "THETA" "OMEGA" ...
#>  .. $ random_effect: chr  NA NA NA "ETA1" ...
#>  .. $ diagonal     : logi  NA NA NA TRUE TRUE TRUE ...
#>  .. $ transforms   : chr  "Identity" "Identity" "Identity" "LogNormal" ...
#>  .. $ cv           : num  NA NA NA 36.1 36.3 ...
#>  .. $ corr         : num  NA NA NA NA NA ...
#>  .. $ sd           : num  NA NA NA 0.35 0.352 ...
#>  .. $ dt_all       : chr  "Identity" "Identity" "Identity" "LogNormal" ...
#>  .. - attr(*, "table_spec")= <hyperion.tables::TableSpec>
#>  ..  ..@ title             : chr "run003 Parameters"
#>  ..  ..@ parameter_names   : <hyperion.tables::ParameterNameOptions>
#>  .. .. .. @ source                 : chr "name"
#>  .. .. .. @ append_omega_with_theta: logi TRUE
#>  ..  ..@ columns           : chr [1:9] "name" "symbol" "unit" "estimate" ...
#>  ..  ..@ add_columns       : NULL
#>  ..  ..@ drop_columns      : NULL
#>  ..  ..@ hide_empty_columns: logi TRUE
#>  ..  ..@ sections          :List of 5
#>  .. .. .. $ : language ~(kind == "THETA" ~ "Structural model parameters")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. .. $ : language ~(kind == "OMEGA" & diagonal ~ "Interindividual variance parameters")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. .. $ : language ~(kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. .. $ : language ~(kind == "SIGMA" ~ "Residual error")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. .. $ : language ~(TRUE ~ "Other")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  ..  ..@ row_filter        : Named list()
#>  .. .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  ..  ..@ display_transforms:List of 3
#>  .. .. .. $ theta: chr "all"
#>  .. .. .. $ omega: chr "all"
#>  .. .. .. $ sigma: chr "all"
#>  ..  ..@ variability_rules :List of 5
#>  .. .. .. $ : language ~(fixed ~ "(Fixed)")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. .. $ : language ~(!is.na(corr) ~ sprintf("(Corr = %s)", corr))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. .. $ : language ~(!is.na(cv) & cv != 0 ~ sprintf("(CV = %s%%)", cv))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. .. $ : language ~(!is.na(sd) ~ sprintf("(SD = %s)", sd))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. .. $ : language ~(TRUE ~ NA_character_)
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  ..  ..@ n_sigfig          : num 3
#>  ..  ..@ n_decimals_ofv    : num 3
#>  ..  ..@ pvalue_scientific : logi FALSE
#>  ..  ..@ pvalue_threshold  : NULL
#>  ..  ..@ ci                : <hyperion.tables::CIOptions>
#>  .. .. .. @ level       : num 0.95
#>  .. .. .. @ merge       : logi TRUE
#>  .. .. .. @ pattern     : chr "[%s, %s]"
#>  .. .. .. @ missing_text: chr "-"
#>  ..  ..@ missing_text      : chr ""
#>  ..  ..@ missing_apply_to  : chr "all"
#>  ..  ..@ footnote_order    : chr [1:3] "summary_info" "equations" "abbreviations"
#>  ..  ..@ .columns_provided : logi FALSE
#>  @ table_type      : chr "parameter"
#>  @ groupname_col   : chr "section"
#>  @ hide_cols       : chr [1:9] "kind" "random_effect" "diagonal" "transforms" "cv" "corr" ...
#>  @ col_labels      :List of 9
#>  .. $ name       : chr "Parameter"
#>  .. $ symbol     : chr "Symbol"
#>  .. $ unit       : chr "Unit"
#>  .. $ estimate   : chr "Estimate"
#>  .. $ ci_low     : chr "95% CI"
#>  .. $ ci_high    : chr "95% CI"
#>  .. $ variability: chr ""
#>  .. $ rse        : chr "RSE (%)"
#>  .. $ shrinkage  : chr "Shrinkage (%)"
#>  @ title           : chr "run003 Parameters"
#>  @ spanners        : list()
#>  @ numeric_cols    : chr [1:5] "estimate" "ci_low" "ci_high" "rse" "shrinkage"
#>  @ n_sigfig        : num 3
#>  @ ci              : <hyperion.tables::CIOptions>
#>  .. @ level       : num 0.95
#>  .. @ merge       : logi TRUE
#>  .. @ pattern     : chr "[%s, %s]"
#>  .. @ missing_text: chr "-"
#>  @ ci_merges       :List of 1
#>  .. $ :List of 3
#>  ..  ..$ ci_low : chr "ci_low"
#>  ..  ..$ ci_high: chr "ci_high"
#>  ..  ..$ pattern: chr "[{1}, {2}]"
#>  @ ci_missing_rows : int [1:9] 1 2 3 4 5 6 7 8 9
#>  @ missing_text    : chr ""
#>  @ missing_apply_to: chr "all"
#>  @ bold_locations  : chr [1:3] "column_labels" "title" "row_groups"
#>  @ borders         : list()
#>  @ footnotes       :List of 5
#>  .. $ :List of 2
#>  ..  ..$ content    : 'from_markdown' chr "95% CI: $\\mathrm{Estimate} \\pm z_{0.025} \\cdot \\mathrm{SE}$"
#>  ..  ..$ is_markdown: logi TRUE
#>  .. $ :List of 2
#>  ..  ..$ content    : 'from_markdown' chr "CV% for log-normal $\\Omega$: $\\sqrt{\\exp(\\mathrm{Estimate}) - 1} \\times 100$"
#>  ..  ..$ is_markdown: logi TRUE
#>  .. $ :List of 2
#>  ..  ..$ content    : chr "Abbreviations:"
#>  ..  ..$ is_markdown: logi FALSE
#>  .. $ :List of 2
#>  ..  ..$ content    : chr "CI = confidence intervals; RSE = relative standard error; SE = standard error;"
#>  ..  ..$ is_markdown: logi FALSE
#>  .. $ :List of 2
#>  ..  ..$ content    : chr "CV = coefficient of variation; SD = standard deviation; Corr = correlation"
#>  ..  ..$ is_markdown: logi FALSE
#>  @ source_spec     : <hyperion.tables::TableSpec>
#>  .. @ title             : chr "run003 Parameters"
#>  .. @ parameter_names   : <hyperion.tables::ParameterNameOptions>
#>  .. .. @ source                 : chr "name"
#>  .. .. @ append_omega_with_theta: logi TRUE
#>  .. @ columns           : chr [1:9] "name" "symbol" "unit" "estimate" "variability" ...
#>  .. @ add_columns       : NULL
#>  .. @ drop_columns      : NULL
#>  .. @ hide_empty_columns: logi TRUE
#>  .. @ sections          :List of 5
#>  .. .. $ : language ~(kind == "THETA" ~ "Structural model parameters")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. $ : language ~(kind == "OMEGA" & diagonal ~ "Interindividual variance parameters")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. $ : language ~(kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. $ : language ~(kind == "SIGMA" ~ "Residual error")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. $ : language ~(TRUE ~ "Other")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10d48b4c8> 
#>  .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  .. @ row_filter        : Named list()
#>  .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  .. @ display_transforms:List of 3
#>  .. .. $ theta: chr "all"
#>  .. .. $ omega: chr "all"
#>  .. .. $ sigma: chr "all"
#>  .. @ variability_rules :List of 5
#>  .. .. $ : language ~(fixed ~ "(Fixed)")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. $ : language ~(!is.na(corr) ~ sprintf("(Corr = %s)", corr))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. $ : language ~(!is.na(cv) & cv != 0 ~ sprintf("(CV = %s%%)", cv))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. $ : language ~(!is.na(sd) ~ sprintf("(SD = %s)", sd))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. $ : language ~(TRUE ~ NA_character_)
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x10da772b8> 
#>  .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  .. @ n_sigfig          : num 3
#>  .. @ n_decimals_ofv    : num 3
#>  .. @ pvalue_scientific : logi FALSE
#>  .. @ pvalue_threshold  : NULL
#>  .. @ ci                : <hyperion.tables::CIOptions>
#>  .. .. @ level       : num 0.95
#>  .. .. @ merge       : logi TRUE
#>  .. .. @ pattern     : chr "[%s, %s]"
#>  .. .. @ missing_text: chr "-"
#>  .. @ missing_text      : chr ""
#>  .. @ missing_apply_to  : chr "all"
#>  .. @ footnote_order    : chr [1:3] "summary_info" "equations" "abbreviations"
#>  .. @ .columns_provided : logi FALSE
```

`hyperion.tables` includes two built-in renderers:

``` r
render_to_gt(hyperion_table)
```

<div id="gfmoystwkr" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#gfmoystwkr table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#gfmoystwkr thead, #gfmoystwkr tbody, #gfmoystwkr tfoot, #gfmoystwkr tr, #gfmoystwkr td, #gfmoystwkr th {
  border-style: none;
}
&#10;#gfmoystwkr p {
  margin: 0;
  padding: 0;
}
&#10;#gfmoystwkr .gt_table {
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
&#10;#gfmoystwkr .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#gfmoystwkr .gt_title {
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
&#10;#gfmoystwkr .gt_subtitle {
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
&#10;#gfmoystwkr .gt_heading {
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
&#10;#gfmoystwkr .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_col_headings {
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
&#10;#gfmoystwkr .gt_col_heading {
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
&#10;#gfmoystwkr .gt_column_spanner_outer {
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
&#10;#gfmoystwkr .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#gfmoystwkr .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#gfmoystwkr .gt_column_spanner {
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
&#10;#gfmoystwkr .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#gfmoystwkr .gt_group_heading {
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
&#10;#gfmoystwkr .gt_empty_group_heading {
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
&#10;#gfmoystwkr .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#gfmoystwkr .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#gfmoystwkr .gt_row {
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
&#10;#gfmoystwkr .gt_stub {
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
&#10;#gfmoystwkr .gt_stub_row_group {
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
&#10;#gfmoystwkr .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#gfmoystwkr .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#gfmoystwkr .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gfmoystwkr .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#gfmoystwkr .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gfmoystwkr .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#gfmoystwkr .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#gfmoystwkr .gt_footnotes {
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
&#10;#gfmoystwkr .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gfmoystwkr .gt_sourcenotes {
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
&#10;#gfmoystwkr .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#gfmoystwkr .gt_left {
  text-align: left;
}
&#10;#gfmoystwkr .gt_center {
  text-align: center;
}
&#10;#gfmoystwkr .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#gfmoystwkr .gt_font_normal {
  font-weight: normal;
}
&#10;#gfmoystwkr .gt_font_bold {
  font-weight: bold;
}
&#10;#gfmoystwkr .gt_font_italic {
  font-style: italic;
}
&#10;#gfmoystwkr .gt_super {
  font-size: 65%;
}
&#10;#gfmoystwkr .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#gfmoystwkr .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#gfmoystwkr .gt_indent_1 {
  text-indent: 5px;
}
&#10;#gfmoystwkr .gt_indent_2 {
  text-indent: 10px;
}
&#10;#gfmoystwkr .gt_indent_3 {
  text-indent: 15px;
}
&#10;#gfmoystwkr .gt_indent_4 {
  text-indent: 20px;
}
&#10;#gfmoystwkr .gt_indent_5 {
  text-indent: 25px;
}
&#10;#gfmoystwkr .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#gfmoystwkr div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.33</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.11, 1.54]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.41</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.2</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[34.6, 45.7]</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.07</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
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
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(1,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.02, 1.25]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.2</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.1</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,2)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.3%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.05, 1.22]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.7</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.63</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(3,3)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.13</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.1%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.01, 1.26]</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>46.0</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.3</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.08</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.606)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[1.01, 1.15]</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.0</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'></span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.0375</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.194)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[0.0257, 0.0494]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.1</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left"><span class='gt_from_md'></span></td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.00527</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.0726)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>[-0.0128, 0.0233]</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>175</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.4</span></td></tr>
  </tbody>
  <tfoot>
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
render_to_flextable(hyperion_table)
```

![](/figures/table-rendering/unnamed-chunk-4-1.png)

## Update render rules and re-render

To change formatting, rebuild the `HyperionTable` with a new `TableSpec`
and re-render it. You can also inspect the formatted data directly.

``` r
spec <- TableSpec(
  sections = section_rules(
    kind == "THETA" ~ "Structural model parameters",
    kind == "OMEGA" & diagonal ~ "Interindividual variance parameters",
    kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters",
    kind == "SIGMA" ~ "Residual error",
    TRUE ~ "Other"
  ),
  title = paste(model_run, "Parameters"),
  n_sigfig = 4,
  ci = CIOptions(
    merge = TRUE,
    pattern = "(%s; %s)",
    missing_text = "NA"
  ),
  missing_text = "NA",
  missing_apply_to = "numeric"
)

hyperion_table <- get_parameters(run003) |>
  apply_table_spec(spec, get_model_parameter_info(run003)) |>
  make_parameter_table(output = "data")

formatted <- apply_formatting(hyperion_table)
names(formatted)
#> [1] "section"     "name"        "symbol"      "unit"        "estimate"   
#> [6] "variability" "ci_low"      "rse"         "shrinkage"
```

``` r
render_to_gt(hyperion_table)
```

<div id="vrnotjeblp" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#vrnotjeblp table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#vrnotjeblp thead, #vrnotjeblp tbody, #vrnotjeblp tfoot, #vrnotjeblp tr, #vrnotjeblp td, #vrnotjeblp th {
  border-style: none;
}
&#10;#vrnotjeblp p {
  margin: 0;
  padding: 0;
}
&#10;#vrnotjeblp .gt_table {
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
&#10;#vrnotjeblp .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#vrnotjeblp .gt_title {
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
&#10;#vrnotjeblp .gt_subtitle {
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
&#10;#vrnotjeblp .gt_heading {
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
&#10;#vrnotjeblp .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_col_headings {
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
&#10;#vrnotjeblp .gt_col_heading {
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
&#10;#vrnotjeblp .gt_column_spanner_outer {
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
&#10;#vrnotjeblp .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#vrnotjeblp .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#vrnotjeblp .gt_column_spanner {
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
&#10;#vrnotjeblp .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#vrnotjeblp .gt_group_heading {
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
&#10;#vrnotjeblp .gt_empty_group_heading {
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
&#10;#vrnotjeblp .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#vrnotjeblp .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#vrnotjeblp .gt_row {
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
&#10;#vrnotjeblp .gt_stub {
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
&#10;#vrnotjeblp .gt_stub_row_group {
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
&#10;#vrnotjeblp .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#vrnotjeblp .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#vrnotjeblp .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vrnotjeblp .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#vrnotjeblp .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vrnotjeblp .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#vrnotjeblp .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vrnotjeblp .gt_footnotes {
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
&#10;#vrnotjeblp .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vrnotjeblp .gt_sourcenotes {
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
&#10;#vrnotjeblp .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vrnotjeblp .gt_left {
  text-align: left;
}
&#10;#vrnotjeblp .gt_center {
  text-align: center;
}
&#10;#vrnotjeblp .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#vrnotjeblp .gt_font_normal {
  font-weight: normal;
}
&#10;#vrnotjeblp .gt_font_bold {
  font-weight: bold;
}
&#10;#vrnotjeblp .gt_font_italic {
  font-style: italic;
}
&#10;#vrnotjeblp .gt_super {
  font-size: 65%;
}
&#10;#vrnotjeblp .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#vrnotjeblp .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#vrnotjeblp .gt_indent_1 {
  text-indent: 5px;
}
&#10;#vrnotjeblp .gt_indent_2 {
  text-indent: 10px;
}
&#10;#vrnotjeblp .gt_indent_3 {
  text-indent: 15px;
}
&#10;#vrnotjeblp .gt_indent_4 {
  text-indent: 20px;
}
&#10;#vrnotjeblp .gt_indent_5 {
  text-indent: 25px;
}
&#10;#vrnotjeblp .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#vrnotjeblp div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVCL</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.325</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(1.107; 1.544)</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>8.411</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVV</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>L</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>40.16</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(34.60; 45.73)</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>7.069</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left"><span class='gt_from_md'>TVKA</span></td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>θ</mi><mn>3</mn></msub></mrow><annotation encoding="application/x-tex">\theta_{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8444em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">θ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0278em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Structural model parameters  unit" class="gt_row gt_left"><span class='gt_from_md'>1/hr</span></td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.212</span></td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(0.9966; 1.427)</span></td>
<td headers="Structural model parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>9.057</span></td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1 TVCL</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(1,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.130</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.07%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(1.024; 1.247)</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>41.16</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>13.14</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM2 TVV</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,2)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.132</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.31%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(1.053; 1.216)</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>29.66</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>4.631</span></td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM3 TVKA</span></td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>3</mn><mo separator="true">,</mo><mn>3</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(3,3)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">3</span><span class="mpunct mtight">,</span><span class="mord mtight">3</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.130</span></td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(CV = 36.09%)</span></td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(1.012; 1.262)</span></td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>45.97</span></td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>24.34</span></td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left"><span class='gt_from_md'>OM1,2 TVCL, TVV</span></td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>exp</mi><mo>⁡</mo><mo stretchy="false">(</mo><msub><mi mathvariant="normal">Ω</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\exp(\Omega_{(2,1)})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1052em;vertical-align:-0.3552em;"></span><span class="mop">exp</span><span class="mopen">(</span><span class="mord"><span class="mord">Ω</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right"><span class='gt_from_md'>1.077</span></td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left"><span class='gt_from_md'>(Corr = 0.6055)</span></td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(1.013; 1.146)</span></td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right"><span class='gt_from_md'>42.04</span></td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" style="font-weight: bold;" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG1</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>1</mn><mo separator="true">,</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(1,1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">1</span><span class="mpunct mtight">,</span><span class="mord mtight">1</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.03754</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.1937)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(0.02571; 0.04937)</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>16.08</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.42</span></td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left"><span class='gt_from_md'>SIG2</span></td>
<td headers="Residual error  symbol" class="gt_row gt_left"><span class='gt_from_md'><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" data-external="1">
<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi mathvariant="normal">Σ</mi><mrow><mo stretchy="false">(</mo><mn>2</mn><mo separator="true">,</mo><mn>2</mn><mo stretchy="false">)</mo></mrow></msub></mrow><annotation encoding="application/x-tex">\Sigma_{(2,2)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0385em;vertical-align:-0.3552em;"></span><span class="mord"><span class="mord">Σ</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3448em;"><span style="top:-2.5198em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mopen mtight">(</span><span class="mord mtight">2</span><span class="mpunct mtight">,</span><span class="mord mtight">2</span><span class="mclose mtight">)</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3552em;"><span></span></span></span></span></span></span></span></span></span></span></td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right"><span class='gt_from_md'>0.005272</span></td>
<td headers="Residual error  variability" class="gt_row gt_left"><span class='gt_from_md'>(SD = 0.07261)</span></td>
<td headers="Residual error  ci_low" class="gt_row gt_right"><span class='gt_from_md'>(-0.01278; 0.02333)</span></td>
<td headers="Residual error  rse" class="gt_row gt_right"><span class='gt_from_md'>174.7</span></td>
<td headers="Residual error  shrinkage" class="gt_row gt_right"><span class='gt_from_md'>14.42</span></td></tr>
  </tbody>
  <tfoot>
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
head(formatted)
#>                               section     name                   symbol unit
#> 1         Structural model parameters     TVCL            $\\theta_{1}$ L/hr
#> 2         Structural model parameters      TVV            $\\theta_{2}$    L
#> 3         Structural model parameters     TVKA            $\\theta_{3}$ 1/hr
#> 4 Interindividual variance parameters OM1 TVCL $\\exp(\\Omega_{(1,1)})$ <NA>
#> 5 Interindividual variance parameters  OM2 TVV $\\exp(\\Omega_{(2,2)})$ <NA>
#> 6 Interindividual variance parameters OM3 TVKA $\\exp(\\Omega_{(3,3)})$ <NA>
#>   estimate   variability          ci_low   rse shrinkage
#> 1    1.325          <NA>  (1.107; 1.544) 8.411      <NA>
#> 2    40.16          <NA>  (34.60; 45.73) 7.069      <NA>
#> 3    1.212          <NA> (0.9966; 1.427) 9.057      <NA>
#> 4    1.130 (CV = 36.07%)  (1.024; 1.247) 41.16     13.14
#> 5    1.132 (CV = 36.31%)  (1.053; 1.216) 29.66     4.631
#> 6    1.130 (CV = 36.09%)  (1.012; 1.262) 45.97     24.34
```

## Extending with a custom renderer

Custom renderers should accept a `HyperionTable`, call
`apply_formatting()`, and then build output using your chosen table
package.

``` r
render_custom <- function(table) {
  data <- apply_formatting(table)
  # Replace with your rendering package of choice
    gt::gt(data, groupname_col = table@groupname_col)
}

render_custom(hyperion_table)
```

<div id="oqbnrskujy" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#oqbnrskujy table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#oqbnrskujy thead, #oqbnrskujy tbody, #oqbnrskujy tfoot, #oqbnrskujy tr, #oqbnrskujy td, #oqbnrskujy th {
  border-style: none;
}
&#10;#oqbnrskujy p {
  margin: 0;
  padding: 0;
}
&#10;#oqbnrskujy .gt_table {
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
&#10;#oqbnrskujy .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#oqbnrskujy .gt_title {
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
&#10;#oqbnrskujy .gt_subtitle {
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
&#10;#oqbnrskujy .gt_heading {
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
&#10;#oqbnrskujy .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_col_headings {
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
&#10;#oqbnrskujy .gt_col_heading {
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
&#10;#oqbnrskujy .gt_column_spanner_outer {
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
&#10;#oqbnrskujy .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#oqbnrskujy .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#oqbnrskujy .gt_column_spanner {
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
&#10;#oqbnrskujy .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#oqbnrskujy .gt_group_heading {
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
&#10;#oqbnrskujy .gt_empty_group_heading {
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
&#10;#oqbnrskujy .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#oqbnrskujy .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#oqbnrskujy .gt_row {
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
&#10;#oqbnrskujy .gt_stub {
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
&#10;#oqbnrskujy .gt_stub_row_group {
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
&#10;#oqbnrskujy .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#oqbnrskujy .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#oqbnrskujy .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oqbnrskujy .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#oqbnrskujy .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oqbnrskujy .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#oqbnrskujy .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#oqbnrskujy .gt_footnotes {
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
&#10;#oqbnrskujy .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oqbnrskujy .gt_sourcenotes {
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
&#10;#oqbnrskujy .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#oqbnrskujy .gt_left {
  text-align: left;
}
&#10;#oqbnrskujy .gt_center {
  text-align: center;
}
&#10;#oqbnrskujy .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#oqbnrskujy .gt_font_normal {
  font-weight: normal;
}
&#10;#oqbnrskujy .gt_font_bold {
  font-weight: bold;
}
&#10;#oqbnrskujy .gt_font_italic {
  font-style: italic;
}
&#10;#oqbnrskujy .gt_super {
  font-size: 65%;
}
&#10;#oqbnrskujy .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#oqbnrskujy .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#oqbnrskujy .gt_indent_1 {
  text-indent: 5px;
}
&#10;#oqbnrskujy .gt_indent_2 {
  text-indent: 10px;
}
&#10;#oqbnrskujy .gt_indent_3 {
  text-indent: 15px;
}
&#10;#oqbnrskujy .gt_indent_4 {
  text-indent: 20px;
}
&#10;#oqbnrskujy .gt_indent_5 {
  text-indent: 25px;
}
&#10;#oqbnrskujy .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#oqbnrskujy div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="name">name</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="symbol">symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="unit">unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="estimate">estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="variability">variability</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="ci_low">ci_low</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="rse">rse</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="shrinkage">shrinkage</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left">TVCL</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{1}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">L/hr</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">1.325</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_left">(1.107; 1.544)</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">8.411</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left">TVV</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{2}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">L</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">40.16</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_left">(34.60; 45.73)</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">7.069</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left">TVKA</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{3}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">1/hr</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">1.212</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_left">(0.9966; 1.427)</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">9.057</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM1 TVCL</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(1,1)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.130</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">(CV = 36.07%)</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_left">(1.024; 1.247)</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">41.16</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">13.14</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM2 TVV</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(2,2)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.132</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">(CV = 36.31%)</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_left">(1.053; 1.216)</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">29.66</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">4.631</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM3 TVKA</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(3,3)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.130</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">(CV = 36.09%)</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_left">(1.012; 1.262)</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">45.97</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">24.34</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left">OM1,2 TVCL, TVV</td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(2,1)})$</td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right">1.077</td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left">(Corr = 0.6055)</td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_left">(1.013; 1.146)</td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right">42.04</td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right">NA</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="8" class="gt_group_heading" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left">SIG1</td>
<td headers="Residual error  symbol" class="gt_row gt_left">$\Sigma_{(1,1)}$</td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right">0.03754</td>
<td headers="Residual error  variability" class="gt_row gt_left">(SD = 0.1937)</td>
<td headers="Residual error  ci_low" class="gt_row gt_left">(0.02571; 0.04937)</td>
<td headers="Residual error  rse" class="gt_row gt_right">16.08</td>
<td headers="Residual error  shrinkage" class="gt_row gt_right">14.42</td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left">SIG2</td>
<td headers="Residual error  symbol" class="gt_row gt_left">$\Sigma_{(2,2)}$</td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right">0.005272</td>
<td headers="Residual error  variability" class="gt_row gt_left">(SD = 0.07261)</td>
<td headers="Residual error  ci_low" class="gt_row gt_left">(-0.01278; 0.02333)</td>
<td headers="Residual error  rse" class="gt_row gt_right">174.7</td>
<td headers="Residual error  shrinkage" class="gt_row gt_right">14.42</td></tr>
  </tbody>
  &#10;</table>
</div>

## What if you skip `apply_formatting()`?

If you render directly from the raw `HyperionTable@data`, you will see
unformatted numeric values and separate CI columns (if present). This is
useful for debugging, but not recommended for final output.

``` r
raw_data <- hyperion_table@data
gt::gt(raw_data, groupname_col = hyperion_table@groupname_col)
```

<div id="vcpzccoaun" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#vcpzccoaun table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#vcpzccoaun thead, #vcpzccoaun tbody, #vcpzccoaun tfoot, #vcpzccoaun tr, #vcpzccoaun td, #vcpzccoaun th {
  border-style: none;
}
&#10;#vcpzccoaun p {
  margin: 0;
  padding: 0;
}
&#10;#vcpzccoaun .gt_table {
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
&#10;#vcpzccoaun .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#vcpzccoaun .gt_title {
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
&#10;#vcpzccoaun .gt_subtitle {
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
&#10;#vcpzccoaun .gt_heading {
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
&#10;#vcpzccoaun .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_col_headings {
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
&#10;#vcpzccoaun .gt_col_heading {
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
&#10;#vcpzccoaun .gt_column_spanner_outer {
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
&#10;#vcpzccoaun .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#vcpzccoaun .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#vcpzccoaun .gt_column_spanner {
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
&#10;#vcpzccoaun .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#vcpzccoaun .gt_group_heading {
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
&#10;#vcpzccoaun .gt_empty_group_heading {
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
&#10;#vcpzccoaun .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#vcpzccoaun .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#vcpzccoaun .gt_row {
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
&#10;#vcpzccoaun .gt_stub {
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
&#10;#vcpzccoaun .gt_stub_row_group {
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
&#10;#vcpzccoaun .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#vcpzccoaun .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#vcpzccoaun .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vcpzccoaun .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#vcpzccoaun .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vcpzccoaun .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#vcpzccoaun .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#vcpzccoaun .gt_footnotes {
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
&#10;#vcpzccoaun .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vcpzccoaun .gt_sourcenotes {
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
&#10;#vcpzccoaun .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#vcpzccoaun .gt_left {
  text-align: left;
}
&#10;#vcpzccoaun .gt_center {
  text-align: center;
}
&#10;#vcpzccoaun .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#vcpzccoaun .gt_font_normal {
  font-weight: normal;
}
&#10;#vcpzccoaun .gt_font_bold {
  font-weight: bold;
}
&#10;#vcpzccoaun .gt_font_italic {
  font-style: italic;
}
&#10;#vcpzccoaun .gt_super {
  font-size: 65%;
}
&#10;#vcpzccoaun .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#vcpzccoaun .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#vcpzccoaun .gt_indent_1 {
  text-indent: 5px;
}
&#10;#vcpzccoaun .gt_indent_2 {
  text-indent: 10px;
}
&#10;#vcpzccoaun .gt_indent_3 {
  text-indent: 15px;
}
&#10;#vcpzccoaun .gt_indent_4 {
  text-indent: 20px;
}
&#10;#vcpzccoaun .gt_indent_5 {
  text-indent: 25px;
}
&#10;#vcpzccoaun .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#vcpzccoaun div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
</style>
<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="name">name</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="symbol">symbol</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="unit">unit</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="estimate">estimate</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="variability">variability</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="ci_low">ci_low</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="ci_high">ci_high</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="rse">rse</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="shrinkage">shrinkage</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_center" rowspan="1" colspan="1" scope="col" id="fixed">fixed</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="kind">kind</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="random_effect">random_effect</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_center" rowspan="1" colspan="1" scope="col" id="diagonal">diagonal</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="transforms">transforms</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="cv">cv</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="corr">corr</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" scope="col" id="sd">sd</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="dt_all">dt_all</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="18" class="gt_group_heading" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Structural model parameters  name" class="gt_row gt_left">TVCL</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{1}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">L/hr</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">1.32542000</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right">1.10691538</td>
<td headers="Structural model parameters  ci_high" class="gt_row gt_right">1.54392462</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">8.411221</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Structural model parameters  kind" class="gt_row gt_left">THETA</td>
<td headers="Structural model parameters  random_effect" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  diagonal" class="gt_row gt_center">NA</td>
<td headers="Structural model parameters  transforms" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  cv" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  sd" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left">TVV</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{2}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">L</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">40.16250000</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right">34.59818185</td>
<td headers="Structural model parameters  ci_high" class="gt_row gt_right">45.72681815</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">7.068758</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Structural model parameters  kind" class="gt_row gt_left">THETA</td>
<td headers="Structural model parameters  random_effect" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  diagonal" class="gt_row gt_center">NA</td>
<td headers="Structural model parameters  transforms" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  cv" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  sd" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td></tr>
    <tr><td headers="Structural model parameters  name" class="gt_row gt_left">TVKA</td>
<td headers="Structural model parameters  symbol" class="gt_row gt_left">$\theta_{3}$</td>
<td headers="Structural model parameters  unit" class="gt_row gt_left">1/hr</td>
<td headers="Structural model parameters  estimate" class="gt_row gt_right">1.21172000</td>
<td headers="Structural model parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  ci_low" class="gt_row gt_right">0.99661983</td>
<td headers="Structural model parameters  ci_high" class="gt_row gt_right">1.42682017</td>
<td headers="Structural model parameters  rse" class="gt_row gt_right">9.057125</td>
<td headers="Structural model parameters  shrinkage" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Structural model parameters  kind" class="gt_row gt_left">THETA</td>
<td headers="Structural model parameters  random_effect" class="gt_row gt_left">NA</td>
<td headers="Structural model parameters  diagonal" class="gt_row gt_center">NA</td>
<td headers="Structural model parameters  transforms" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  cv" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  sd" class="gt_row gt_right">NA</td>
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="18" class="gt_group_heading" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM1 TVCL</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(1,1)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.13014054</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">1.02392904</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">1.24736930</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">41.159536</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">13.14400</td>
<td headers="Interindividual variance parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Interindividual variance parameters  kind" class="gt_row gt_left">OMEGA</td>
<td headers="Interindividual variance parameters  random_effect" class="gt_row gt_left">ETA1</td>
<td headers="Interindividual variance parameters  diagonal" class="gt_row gt_center">TRUE</td>
<td headers="Interindividual variance parameters  transforms" class="gt_row gt_left">LogNormal</td>
<td headers="Interindividual variance parameters  cv" class="gt_row gt_right">36.07500</td>
<td headers="Interindividual variance parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Interindividual variance parameters  sd" class="gt_row gt_right">0.3497740</td>
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">LogNormal</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM2 TVV</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(2,2)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.13187777</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">1.05322426</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">1.21640504</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">29.663459</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">4.63131</td>
<td headers="Interindividual variance parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Interindividual variance parameters  kind" class="gt_row gt_left">OMEGA</td>
<td headers="Interindividual variance parameters  random_effect" class="gt_row gt_left">ETA2</td>
<td headers="Interindividual variance parameters  diagonal" class="gt_row gt_center">TRUE</td>
<td headers="Interindividual variance parameters  transforms" class="gt_row gt_left">LogNormal</td>
<td headers="Interindividual variance parameters  cv" class="gt_row gt_right">36.31498</td>
<td headers="Interindividual variance parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Interindividual variance parameters  sd" class="gt_row gt_right">0.3519630</td>
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">LogNormal</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM3 TVKA</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(3,3)})$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">1.13021966</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">1.01218256</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">1.26202181</td>
<td headers="Interindividual variance parameters  rse" class="gt_row gt_right">45.974333</td>
<td headers="Interindividual variance parameters  shrinkage" class="gt_row gt_right">24.33760</td>
<td headers="Interindividual variance parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Interindividual variance parameters  kind" class="gt_row gt_left">OMEGA</td>
<td headers="Interindividual variance parameters  random_effect" class="gt_row gt_left">ETA3</td>
<td headers="Interindividual variance parameters  diagonal" class="gt_row gt_center">TRUE</td>
<td headers="Interindividual variance parameters  transforms" class="gt_row gt_left">LogNormal</td>
<td headers="Interindividual variance parameters  cv" class="gt_row gt_right">36.08596</td>
<td headers="Interindividual variance parameters  corr" class="gt_row gt_right">NA</td>
<td headers="Interindividual variance parameters  sd" class="gt_row gt_right">0.3498740</td>
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">LogNormal</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="18" class="gt_group_heading" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left">OM1,2 TVCL, TVV</td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left">$\exp(\Omega_{(2,1)})$</td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right">1.07739199</td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right">1.01321438</td>
<td headers="Interindividual covariance parameters  ci_high" class="gt_row gt_right">1.14563466</td>
<td headers="Interindividual covariance parameters  rse" class="gt_row gt_right">42.035971</td>
<td headers="Interindividual covariance parameters  shrinkage" class="gt_row gt_right">NA</td>
<td headers="Interindividual covariance parameters  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Interindividual covariance parameters  kind" class="gt_row gt_left">OMEGA</td>
<td headers="Interindividual covariance parameters  random_effect" class="gt_row gt_left">ETA1:ETA2</td>
<td headers="Interindividual covariance parameters  diagonal" class="gt_row gt_center">FALSE</td>
<td headers="Interindividual covariance parameters  transforms" class="gt_row gt_left">LogNormal</td>
<td headers="Interindividual covariance parameters  cv" class="gt_row gt_right">27.81942</td>
<td headers="Interindividual covariance parameters  corr" class="gt_row gt_right">0.605513</td>
<td headers="Interindividual covariance parameters  sd" class="gt_row gt_right">NA</td>
<td headers="Interindividual covariance parameters  dt_all" class="gt_row gt_left">LogNormal</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="18" class="gt_group_heading" scope="colgroup" id="Residual error">Residual error</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Residual error  name" class="gt_row gt_left">SIG1</td>
<td headers="Residual error  symbol" class="gt_row gt_left">$\Sigma_{(1,1)}$</td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right">0.03753710</td>
<td headers="Residual error  variability" class="gt_row gt_left">NA</td>
<td headers="Residual error  ci_low" class="gt_row gt_right">0.02570885</td>
<td headers="Residual error  ci_high" class="gt_row gt_right">0.04936535</td>
<td headers="Residual error  rse" class="gt_row gt_right">16.077241</td>
<td headers="Residual error  shrinkage" class="gt_row gt_right">14.42190</td>
<td headers="Residual error  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Residual error  kind" class="gt_row gt_left">SIGMA</td>
<td headers="Residual error  random_effect" class="gt_row gt_left">EPS1</td>
<td headers="Residual error  diagonal" class="gt_row gt_center">TRUE</td>
<td headers="Residual error  transforms" class="gt_row gt_left">Identity</td>
<td headers="Residual error  cv" class="gt_row gt_right">NA</td>
<td headers="Residual error  corr" class="gt_row gt_right">NA</td>
<td headers="Residual error  sd" class="gt_row gt_right">0.1937450</td>
<td headers="Residual error  dt_all" class="gt_row gt_left">Identity</td></tr>
    <tr><td headers="Residual error  name" class="gt_row gt_left">SIG2</td>
<td headers="Residual error  symbol" class="gt_row gt_left">$\Sigma_{(2,2)}$</td>
<td headers="Residual error  unit" class="gt_row gt_left">NA</td>
<td headers="Residual error  estimate" class="gt_row gt_right">0.00527228</td>
<td headers="Residual error  variability" class="gt_row gt_left">NA</td>
<td headers="Residual error  ci_low" class="gt_row gt_right">-0.01278087</td>
<td headers="Residual error  ci_high" class="gt_row gt_right">0.02332543</td>
<td headers="Residual error  rse" class="gt_row gt_right">174.705441</td>
<td headers="Residual error  shrinkage" class="gt_row gt_right">14.42190</td>
<td headers="Residual error  fixed" class="gt_row gt_center">FALSE</td>
<td headers="Residual error  kind" class="gt_row gt_left">SIGMA</td>
<td headers="Residual error  random_effect" class="gt_row gt_left">EPS2</td>
<td headers="Residual error  diagonal" class="gt_row gt_center">TRUE</td>
<td headers="Residual error  transforms" class="gt_row gt_left">Identity</td>
<td headers="Residual error  cv" class="gt_row gt_right">NA</td>
<td headers="Residual error  corr" class="gt_row gt_right">NA</td>
<td headers="Residual error  sd" class="gt_row gt_right">0.0726105</td>
<td headers="Residual error  dt_all" class="gt_row gt_left">Identity</td></tr>
  </tbody>
  &#10;</table>
</div>

## Notes

- The render rules are **shared** across renderers to keep tables
  consistent.
- `make_parameter_table(output = "data")` returns the `HyperionTable`.
- If you need tighter control, use `apply_formatting()` and pass the
  returned data frame to your custom renderer.
