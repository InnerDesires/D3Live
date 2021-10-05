module.exports = {
  // ####################################################
  // THE NAME OF PLUGIN DIRECTORY, CLASS, NAMESPACE,
  // PLEASE DO NOT CHANGE THIS FIELD!!!
  plugin_name: 'D3Live',
  // ####################################################

  // the dir path of MicroStrategy plugins, relative or absolute path are both valid
  path_of_plugins: 'C:\\Program Files\\MicroStrategy\\Workstation\\Code\\plugins',
  // Whether you wanna manage WEB-INF altogether by yourself.
  // By default, files(e.g. messageBundle, styleCatalog.xml and visualizations.xml) in WEB-INF
  // would be created and updated based on this config file.
  // Only in the following two cases, the flag would be set to `TRUE`.
  // 1. You are an expert on MSTR custom vis.
  // 2. The custom vis is migrated from an old one, because we don't know if you've ever changed the WEB-INF.
  manual: false,
  // This field will be displayed in the vis gallery.
  // As default, this value is same as plugin_name.
  // But if plugin_name is D3WordCloud, then 'Word Cloud' is more readable and suitable as visualization_name.
  visualization_name: 'D3Live',
  available_for_reports: true,
  available_for_documents: true,
  available_for_dossiers: true,
  min_number_of_attributes: 0,
  min_number_of_metrics: 0,
};
