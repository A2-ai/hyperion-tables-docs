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

library(gt)
library(flextable)
library(officer)

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
      make_parameter_table() |>
        render_to_image()

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
) |>
    set_spec_transforms(omega = "cv")

run003 <- read_model(file.path(model_dir, paste0(model_run, ".mod")))

hyperion_table <- get_parameters(run003) |>
  apply_table_spec(spec, get_model_parameter_info(run003)) |>
  make_parameter_table(output = "data")

hyperion_table
#> <hyperion.tables::HyperionTable>
#>  @ data            :'data.frame':    9 obs. of  20 variables:
#>  .. $ name         : chr  "TVCL" "TVV" "TVKA" "OM1 TVCL" ...
#>  .. $ symbol       : chr  "$\\theta_{1}$" "$\\theta_{2}$" "$\\theta_{3}$" "$\\Omega_{(1,1)}$" ...
#>  .. $ unit         : chr  "L/hr" "L" "1/hr" NA ...
#>  .. $ estimate     : num  1.325 40.163 1.212 0.122 0.124 ...
#>  .. $ variability  : chr  NA NA NA NA ...
#>  .. $ ci_low       : num  1.1069 34.5982 0.9966 0.0236 0.0519 ...
#>  .. $ ci_high      : num  1.544 45.727 1.427 0.221 0.196 ...
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
#>  .. $ dt_all       : chr  "Identity" "Identity" "Identity" "identity" ...
#>  .. $ dt_cv        : chr  "Identity" "Identity" "Identity" "LogNormal" ...
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
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. .. $ : language ~(kind == "OMEGA" & diagonal ~ "Interindividual variance parameters")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. .. $ : language ~(kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. .. $ : language ~(kind == "SIGMA" ~ "Residual error")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. .. $ : language ~(TRUE ~ "Other")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  ..  ..@ section_filter    : NULL
#>  ..  ..@ row_filter        : Named list()
#>  .. .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  ..  ..@ display_transforms:List of 3
#>  .. .. .. $ theta: chr "all"
#>  .. .. .. $ omega: chr "cv"
#>  .. .. .. $ sigma: chr "all"
#>  ..  ..@ variability_rules :List of 5
#>  .. .. .. $ : language ~(fixed ~ "(Fixed)")
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. .. $ : language ~(!is.na(corr) ~ sprintf("(Corr = %s)", corr))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. .. $ : language ~(!is.na(cv) & cv != 0 ~ sprintf("(CV = %s%%)", cv))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. .. $ : language ~(!is.na(sd) ~ sprintf("(SD = %s)", sd))
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. .. $ : language ~(TRUE ~ NA_character_)
#>  .. .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
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
#>  @ hide_cols       : chr [1:10] "kind" "random_effect" "diagonal" "transforms" "cv" "corr" ...
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
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. $ : language ~(kind == "OMEGA" & diagonal ~ "Interindividual variance parameters")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. $ : language ~(kind == "OMEGA" & !diagonal ~ "Interindividual covariance parameters")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. $ : language ~(kind == "SIGMA" ~ "Residual error")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. $ : language ~(TRUE ~ "Other")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121c2e528> 
#>  .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  .. @ section_filter    : NULL
#>  .. @ row_filter        : Named list()
#>  .. .. - attr(*, "class")= chr [1:2] "quosures" "list"
#>  .. @ display_transforms:List of 3
#>  .. .. $ theta: chr "all"
#>  .. .. $ omega: chr "cv"
#>  .. .. $ sigma: chr "all"
#>  .. @ variability_rules :List of 5
#>  .. .. $ : language ~(fixed ~ "(Fixed)")
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. $ : language ~(!is.na(corr) ~ sprintf("(Corr = %s)", corr))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. $ : language ~(!is.na(cv) & cv != 0 ~ sprintf("(CV = %s%%)", cv))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. $ : language ~(!is.na(sd) ~ sprintf("(SD = %s)", sd))
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
#>  .. .. $ : language ~(TRUE ~ NA_character_)
#>  .. ..  ..- attr(*, ".Environment")=<environment: 0x121f6dea0> 
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
render_to_gt(hyperion_table) |>
    render_to_image()
```

![](/figures/table-rendering/unnamed-chunk-3-1.png)

``` r
hyperion_table |>
    render_to_flextable() |>
    render_to_image()
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
) |>
  set_spec_transforms(omega = "cv")

hyperion_table <- get_parameters(run003) |>
  apply_table_spec(spec, get_model_parameter_info(run003)) |>
  make_parameter_table(output = "data")

formatted <- apply_formatting(hyperion_table)
names(formatted)
#> [1] "section"     "name"        "symbol"      "unit"        "estimate"   
#> [6] "variability" "ci_low"      "rse"         "shrinkage"
```

``` r
render_to_gt(hyperion_table) |>
    render_to_image()
```

![](/figures/table-rendering/unnamed-chunk-6-1.png)

``` r
head(formatted)
#>                               section     name            symbol unit estimate
#> 1         Structural model parameters     TVCL     $\\theta_{1}$ L/hr    1.325
#> 2         Structural model parameters      TVV     $\\theta_{2}$    L    40.16
#> 3         Structural model parameters     TVKA     $\\theta_{3}$ 1/hr    1.212
#> 4 Interindividual variance parameters OM1 TVCL $\\Omega_{(1,1)}$ <NA>   0.1223
#> 5 Interindividual variance parameters  OM2 TVV $\\Omega_{(2,2)}$ <NA>   0.1239
#> 6 Interindividual variance parameters OM3 TVKA $\\Omega_{(3,3)}$ <NA>   0.1224
#>     variability            ci_low   rse shrinkage
#> 1          <NA>    (1.107; 1.544) 8.411      <NA>
#> 2          <NA>    (34.60; 45.73) 7.069      <NA>
#> 3          <NA>   (0.9966; 1.427) 9.057      <NA>
#> 4 (CV = 36.07%) (0.02365; 0.2210) 41.16     13.14
#> 5 (CV = 36.31%) (0.05186; 0.1959) 29.66     4.631
#> 6 (CV = 36.09%) (0.01211; 0.2327) 45.97     24.34
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

render_custom(hyperion_table) |>
    render_to_image()
```

![](/figures/table-rendering/unnamed-chunk-8-1.png)

## What if you skip `apply_formatting()`?

If you render directly from the raw `HyperionTable@data`, you will see
unformatted numeric values and separate CI columns (if present). This is
useful for debugging, but not recommended for final output.

``` r
raw_data <- hyperion_table@data
gt::gt(raw_data, groupname_col = hyperion_table@groupname_col)
```

<div id="qinbczonch" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
<style>#qinbczonch table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
&#10;#qinbczonch thead, #qinbczonch tbody, #qinbczonch tfoot, #qinbczonch tr, #qinbczonch td, #qinbczonch th {
  border-style: none;
}
&#10;#qinbczonch p {
  margin: 0;
  padding: 0;
}
&#10;#qinbczonch .gt_table {
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
&#10;#qinbczonch .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}
&#10;#qinbczonch .gt_title {
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
&#10;#qinbczonch .gt_subtitle {
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
&#10;#qinbczonch .gt_heading {
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
&#10;#qinbczonch .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qinbczonch .gt_col_headings {
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
&#10;#qinbczonch .gt_col_heading {
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
&#10;#qinbczonch .gt_column_spanner_outer {
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
&#10;#qinbczonch .gt_column_spanner_outer:first-child {
  padding-left: 0;
}
&#10;#qinbczonch .gt_column_spanner_outer:last-child {
  padding-right: 0;
}
&#10;#qinbczonch .gt_column_spanner {
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
&#10;#qinbczonch .gt_spanner_row {
  border-bottom-style: hidden;
}
&#10;#qinbczonch .gt_group_heading {
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
&#10;#qinbczonch .gt_empty_group_heading {
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
&#10;#qinbczonch .gt_from_md > :first-child {
  margin-top: 0;
}
&#10;#qinbczonch .gt_from_md > :last-child {
  margin-bottom: 0;
}
&#10;#qinbczonch .gt_row {
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
&#10;#qinbczonch .gt_stub {
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
&#10;#qinbczonch .gt_stub_row_group {
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
&#10;#qinbczonch .gt_row_group_first td {
  border-top-width: 2px;
}
&#10;#qinbczonch .gt_row_group_first th {
  border-top-width: 2px;
}
&#10;#qinbczonch .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qinbczonch .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}
&#10;#qinbczonch .gt_first_summary_row.thick {
  border-top-width: 2px;
}
&#10;#qinbczonch .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qinbczonch .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qinbczonch .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}
&#10;#qinbczonch .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}
&#10;#qinbczonch .gt_striped {
  background-color: rgba(128, 128, 128, 0.05);
}
&#10;#qinbczonch .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}
&#10;#qinbczonch .gt_footnotes {
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
&#10;#qinbczonch .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qinbczonch .gt_sourcenotes {
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
&#10;#qinbczonch .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}
&#10;#qinbczonch .gt_left {
  text-align: left;
}
&#10;#qinbczonch .gt_center {
  text-align: center;
}
&#10;#qinbczonch .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
&#10;#qinbczonch .gt_font_normal {
  font-weight: normal;
}
&#10;#qinbczonch .gt_font_bold {
  font-weight: bold;
}
&#10;#qinbczonch .gt_font_italic {
  font-style: italic;
}
&#10;#qinbczonch .gt_super {
  font-size: 65%;
}
&#10;#qinbczonch .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}
&#10;#qinbczonch .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}
&#10;#qinbczonch .gt_indent_1 {
  text-indent: 5px;
}
&#10;#qinbczonch .gt_indent_2 {
  text-indent: 10px;
}
&#10;#qinbczonch .gt_indent_3 {
  text-indent: 15px;
}
&#10;#qinbczonch .gt_indent_4 {
  text-indent: 20px;
}
&#10;#qinbczonch .gt_indent_5 {
  text-indent: 25px;
}
&#10;#qinbczonch .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}
&#10;#qinbczonch div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
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
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" scope="col" id="dt_cv">dt_cv</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr class="gt_group_heading_row">
      <th colspan="19" class="gt_group_heading" scope="colgroup" id="Structural model parameters">Structural model parameters</th>
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
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  dt_cv" class="gt_row gt_left">Identity</td></tr>
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
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  dt_cv" class="gt_row gt_left">Identity</td></tr>
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
<td headers="Structural model parameters  dt_all" class="gt_row gt_left">Identity</td>
<td headers="Structural model parameters  dt_cv" class="gt_row gt_left">Identity</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="19" class="gt_group_heading" scope="colgroup" id="Interindividual variance parameters">Interindividual variance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM1 TVCL</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\Omega_{(1,1)}$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">0.12234200</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">0.02364723</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">0.22103677</td>
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
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">identity</td>
<td headers="Interindividual variance parameters  dt_cv" class="gt_row gt_left">LogNormal</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM2 TVV</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\Omega_{(2,2)}$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">0.12387800</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">0.05185618</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">0.19589982</td>
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
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">identity</td>
<td headers="Interindividual variance parameters  dt_cv" class="gt_row gt_left">LogNormal</td></tr>
    <tr><td headers="Interindividual variance parameters  name" class="gt_row gt_left">OM3 TVKA</td>
<td headers="Interindividual variance parameters  symbol" class="gt_row gt_left">$\Omega_{(3,3)}$</td>
<td headers="Interindividual variance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  estimate" class="gt_row gt_right">0.12241200</td>
<td headers="Interindividual variance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual variance parameters  ci_low" class="gt_row gt_right">0.01210895</td>
<td headers="Interindividual variance parameters  ci_high" class="gt_row gt_right">0.23271505</td>
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
<td headers="Interindividual variance parameters  dt_all" class="gt_row gt_left">identity</td>
<td headers="Interindividual variance parameters  dt_cv" class="gt_row gt_left">LogNormal</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="19" class="gt_group_heading" scope="colgroup" id="Interindividual covariance parameters">Interindividual covariance parameters</th>
    </tr>
    <tr class="gt_row_group_first"><td headers="Interindividual covariance parameters  name" class="gt_row gt_left">OM1,2 TVCL, TVV</td>
<td headers="Interindividual covariance parameters  symbol" class="gt_row gt_left">$\Omega_{(2,1)}$</td>
<td headers="Interindividual covariance parameters  unit" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  estimate" class="gt_row gt_right">0.07454330</td>
<td headers="Interindividual covariance parameters  variability" class="gt_row gt_left">NA</td>
<td headers="Interindividual covariance parameters  ci_low" class="gt_row gt_right">0.01312783</td>
<td headers="Interindividual covariance parameters  ci_high" class="gt_row gt_right">0.13595877</td>
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
<td headers="Interindividual covariance parameters  dt_all" class="gt_row gt_left">identity</td>
<td headers="Interindividual covariance parameters  dt_cv" class="gt_row gt_left">LogNormal</td></tr>
    <tr class="gt_group_heading_row">
      <th colspan="19" class="gt_group_heading" scope="colgroup" id="Residual error">Residual error</th>
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
<td headers="Residual error  dt_all" class="gt_row gt_left">Identity</td>
<td headers="Residual error  dt_cv" class="gt_row gt_left">Identity</td></tr>
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
<td headers="Residual error  dt_all" class="gt_row gt_left">Identity</td>
<td headers="Residual error  dt_cv" class="gt_row gt_left">Identity</td></tr>
  </tbody>
  &#10;</table>
</div>

## Notes

- The render rules are **shared** across renderers to keep tables
  consistent.
- `make_parameter_table(output = "data")` returns the `HyperionTable`.
- If you need tighter control, use `apply_formatting()` and pass the
  returned data frame to your custom renderer.
