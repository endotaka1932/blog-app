module TabsHelper
    def add_article_class(path)
        'active' if current_page?(path)
    end
end
