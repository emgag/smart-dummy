# Smart Dummy 

Simple drop in replacement for [Smart Ad Server](https://smartadserver.com/) async ad rendering library for local/offline development and displaying mock ads.

Simply reference the dummy smart.js instead of `https://ced.sascdn.com/tag/ID/smart.js` and define a replacement map:

```html
<script>
    var _sasDummy = {
        1: 'https://example.org/format1.png',
        2: 'https://example.org/format2.png'
    }
</script>
<script src="/dist/smart.js" async></script>
```

See [example.html](example.html) for, well, examples.
