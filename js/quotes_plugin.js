( function() {
	var pmcQuotes = {
        init : function( ed, url ) {
            this._createButtons( ed, url );

			this._createCommands( ed, url );
        },

        getInfo : function() {
            return {
				longname : 'PMC Quotes',
				author : 'PMC',
				authorurl : 'http://pmc.com',
				infourl : '',
				version : "1.0"
			};
        },

		_createCommands : function( ed, url ) {
			ed.addCommand( 'pmc-quotes', function() {
                var selected_text = ed.selection.getContent();

                if ( selected_text.length <= 1 )
                	return;

                if ( selected_text.match(/“.*”/) ) {
                	var new_text = selected_text.replace(/“(.*)”/, '$1' );
                	var pattern = new RegExp( selected_text, 'ig' );

	                var content = ed.getContent();
	              	ed.setContent( content.replace(
					    pattern, 
					    new_text
					) );
                } else {
	                var pattern = new RegExp( '(&#8220;)?(\\b' + selected_text + '\\b)(&#8221;)?', 'ig' );

	                var content = ed.getContent();

	              	ed.setContent( content.replace(
					    pattern, 
					    function( $0, $1, $2, $3 ) {
					        if ( $1 ) {
					            return $2;
					        } else {
					            match = true;
					            return '&#8220;' + $0 + '&#8221;';
					        }
					    }
					) );
				}
			} );
		},

		_createButtons : function( ed, url ) {
			ed.addButton( 'pmc-quotes', {
                title : 'pmc-quotes',
                cmd : 'pmc-quotes',
            } );
		}
    }

    tinymce.create( 'tinymce.plugins.pmcQuotes', pmcQuotes );
    tinymce.PluginManager.add( 'pmcQuotes', tinymce.plugins.pmcQuotes );

} )();