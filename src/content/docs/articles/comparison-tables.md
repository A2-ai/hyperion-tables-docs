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
  make_comparison_table() |>
    render_to_image()
#> LRT suppressed for run002 vs run003: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
```

![](/figures/comparison-tables/unnamed-chunk-2-1.png)

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
  make_comparison_table() |>
    render_to_image()
#> LRT suppressed for run002 vs run003: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
#> LRT suppressed for run003 vs run003b1: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
```

![](/figures/comparison-tables/unnamed-chunk-3-1.png)

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
  make_comparison_table() |>
    render_to_image()
#> LRT suppressed for run001 vs run002: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
#> LRT suppressed for run002 vs run003: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
#> LRT suppressed for run003 vs run004: no lineage attached
#> ℹ Both OFVs and matching observation counts are present, but LRT conditions are not met.
```

![](/figures/comparison-tables/unnamed-chunk-4-1.png)
