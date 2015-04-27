Experimental angular / bootstrap app connecting to BazaarVoice API.
See:https://developer.bazaarvoice.com/docs/read/	

RewriteEngine on 

# Don't rewrite files or directories
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} ^(?!/data/).*$
RewriteCond %{REQUEST_FILENAME} ^([^.]+)$
RewriteRule ^ /index.html [L]