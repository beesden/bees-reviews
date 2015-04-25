# Angular ratings / reviews app

Basic angular ratings / reviews app which connects to the [BazaarVoice API](https://developer.bazaarvoice.com/docs/read).
* Browse products (paginated), filter by category
* View product reviews (paginated)
* Write a new review

Tools used:
* [Angular](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [UI Bootstrap](http://angular-ui.github.io/bootstrap/)

The following apache conf is used for URL management:

```apacheconf
RewriteEngine on 

# Don't rewrite files or directories
RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} ^([^.]+)$
RewriteRule ^ /index.html [L]
```
