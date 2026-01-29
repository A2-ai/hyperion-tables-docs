// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { starlightKatex } from "starlight-katex";

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE || "http://localhost",
  base: process.env.ASTRO_BASE || "/",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "hyperion.tables",
      customCss: ["./src/styles/custom.css"],
      plugins: [starlightKatex()],
      components: { SiteTitle: "./src/components/VersionSelect.astro" },
      
      
      
      sidebar: [
    {
      label: "Articles",
      items: [
        {
          label: "Getting Started",
          items: [
            { label: "Welcome", slug: "articles/readme" },
            { label: "Parameter Tables", slug: "articles/parameter-tables" },
            { label: "Comparison Tables", slug: "articles/comparison-tables" },
            { label: "Modelling Summary Tables", slug: "articles/summary-tables" },
            { label: "Customizing Table Renders", slug: "articles/table-rendering" }
          ]
        }
      ]
    },
    {
      label: "Reference",
      items: [
        { label: "hyperion.tables-package", slug: "reference/hyperion-tables-package" },
        {
          label: "Spec Classes",
          items: [
            { label: "TableSpec", slug: "reference/tablespec" },
            { label: "SummarySpec", slug: "reference/summaryspec" },
            { label: "CIOptions", slug: "reference/cioptions" },
            { label: "ParameterNameOptions", slug: "reference/parameternameoptions" }
          ]
        },
        {
          label: "Table Creation",
          items: [
            { label: "make_parameter_table", slug: "reference/make_parameter_table" },
            { label: "make_summary_table", slug: "reference/make_summary_table" },
            { label: "make_comparison_table", slug: "reference/make_comparison_table" }
          ]
        },
        {
          label: "Spec Application",
          items: [
            { label: "apply_table_spec", slug: "reference/apply_table_spec" },
            { label: "apply_summary_spec", slug: "reference/apply_summary_spec" },
            { label: "apply_formatting", slug: "reference/apply_formatting" }
          ]
        },
        {
          label: "Spec Extraction",
          items: [
            { label: "get_table_spec", slug: "reference/get_table_spec" },
            { label: "get_summary_spec", slug: "reference/get_summary_spec" }
          ]
        },
        {
          label: "Spec Getters",
          items: [
            { label: "get_spec_columns", slug: "reference/get_spec_columns" },
            { label: "get_spec_title", slug: "reference/get_spec_title" },
            { label: "get_spec_sigfig", slug: "reference/get_spec_sigfig" },
            { label: "get_spec_ci", slug: "reference/get_spec_ci" },
            { label: "get_spec_parameter_names", slug: "reference/get_spec_parameter_names" },
            { label: "get_spec_sections", slug: "reference/get_spec_sections" },
            { label: "get_spec_filter", slug: "reference/get_spec_filter" },
            { label: "get_spec_transforms", slug: "reference/get_spec_transforms" },
            { label: "get_spec_variability", slug: "reference/get_spec_variability" },
            { label: "get_spec_time_format", slug: "reference/get_spec_time_format" }
          ]
        },
        {
          label: "Spec Modifiers - Columns",
          items: [
            { label: "add_spec_columns", slug: "reference/add_spec_columns" },
            { label: "drop_spec_columns", slug: "reference/drop_spec_columns" },
            { label: "set_spec_columns", slug: "reference/set_spec_columns" }
          ]
        },
        {
          label: "Spec Modifiers - Common",
          items: [
            { label: "set_spec_title", slug: "reference/set_spec_title" },
            { label: "set_spec_sigfig", slug: "reference/set_spec_sigfig" },
            { label: "set_spec_ofv_decimals", slug: "reference/set_spec_ofv_decimals" },
            { label: "set_spec_hide_empty", slug: "reference/set_spec_hide_empty" },
            { label: "set_spec_pvalue", slug: "reference/set_spec_pvalue" },
            { label: "set_spec_footnotes", slug: "reference/set_spec_footnotes" }
          ]
        },
        {
          label: "Spec Modifiers - TableSpec",
          items: [
            { label: "set_spec_parameter_names", slug: "reference/set_spec_parameter_names" },
            { label: "set_spec_ci", slug: "reference/set_spec_ci" },
            { label: "set_spec_missing", slug: "reference/set_spec_missing" },
            { label: "set_spec_transforms", slug: "reference/set_spec_transforms" },
            { label: "set_spec_sections", slug: "reference/set_spec_sections" },
            { label: "set_spec_filter", slug: "reference/set_spec_filter" },
            { label: "set_spec_variability", slug: "reference/set_spec_variability" }
          ]
        },
        {
          label: "Spec Modifiers - SummarySpec",
          items: [
            { label: "set_spec_time_format", slug: "reference/set_spec_time_format" },
            { label: "set_spec_models", slug: "reference/set_spec_models" },
            { label: "set_spec_tag_filter", slug: "reference/set_spec_tag_filter" },
            { label: "set_spec_remove_unrun", slug: "reference/set_spec_remove_unrun" },
            { label: "set_spec_summary_filter", slug: "reference/set_spec_summary_filter" }
          ]
        },
        {
          label: "Rule Builders",
          items: [
            { label: "section_rules", slug: "reference/section_rules" },
            { label: "filter_rules", slug: "reference/filter_rules" },
            { label: "variability_rules", slug: "reference/variability_rules" },
            { label: "summary_filter_rules", slug: "reference/summary_filter_rules" }
          ]
        },
        {
          label: "Rendering",
          items: [
            { label: "render_to_gt", slug: "reference/render_to_gt" },
            { label: "render_to_flextable", slug: "reference/render_to_flextable" }
          ]
        },
        {
          label: "Model Comparison",
          items: [
            { label: "compare_with", slug: "reference/compare_with" },
            { label: "add_model_lineage", slug: "reference/add_model_lineage" },
            { label: "add_summary_info", slug: "reference/add_summary_info" }
          ]
        }
      ]
    }
  ]
    })
  ]
});

