MIN = config[:environment] == :production
EXT = '${EXT}'.freeze

activate :blog do |blog|
  Time.zone = 'America/New_York'

  blog.sources = "blog/{title}/index.#{EXT}"
  blog.default_extension = '.slim'

  # blog.layout = 'blog'
  blog.permalink = '{title}'

  # blog.generate_tag_pages = true
  blog.tag_template = "articles.#{EXT}"
  blog.taglink = "{tag}/index.#{EXT}"

  blog.calendar_template = "articles.#{EXT}"
  blog.year_link = "{year}/index.#{EXT}"
  blog.month_link = "{year}/{month}/index.#{EXT}"
  blog.day_link = "{year}/{month}/{day}/index.#{EXT}"

  blog.generate_year_pages = false
  blog.generate_month_pages = false
  blog.generate_day_pages = false

  blog.paginate = true
  blog.per_page = 3
  blog.page_link = 'page/{num}'
end

activate :directory_indexes

activate :external_pipeline,
  command: 'gulp build',
  name: :gulp,
  source: MIN ? 'docs' : 'copy'

configure :development do
  if build?
    # url_for('/blog/file.xhtml') or url_for(sitemap.resources[0])
    # Example: link(href="#{url_for('/css/style.css')}" rel='stylesheet')

    activate :relative_assets
    set :relative_links, true
    set :strip_index_file, false
  end
end

configure :production do
  activate :asset_hash
  activate :minify_html, remove_quotes: false, simple_boolean_attributes: false
end

ignore(/.*\.keep/)
ignore(/\.es6/)
ignore(/\.sass/)
ignore(%r{\.riot/.*})

set :build_dir, MIN ? 'docs' : 'copy'
set :css_dir, 'css' if File.directory? 'code/css/'
set :fonts_dir, 'fonts' if File.directory? 'code/fonts/'
set :helpers_dir, 'lib' if File.directory? 'lib/'
set :images_dir, 'img' if File.directory? 'code/img/'
set :js_dir, 'js' if File.directory? 'code/js/'
set :layouts_dir, '_' if File.directory? 'code/_/'
set :source, 'code' if File.directory? 'code/'

set :index_file, "index.#{EXT}"
set :layout, 'layout'

set :slim,
  attr_quote: "'",
  format: EXT.to_sym,
  pretty: !MIN,
  sort_attrs: true,
  shortcut: {
    '@' => { attr: 'role' },
    '#' => { attr: 'id' },
    '.' => { attr: 'class' },
    '%' => { attr: 'itemprop' },
    '^' => { attr: 'data-is' },
    '&' => { attr: 'type', tag: 'input' }
  }
