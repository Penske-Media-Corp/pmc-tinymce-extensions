( function() {
	var pmcItalics = {
        init : function( ed, url ) {
            this._createButtons( ed, url );

			this._createCommands( ed, url );
        },

        getInfo : function() {
            return {
				longname : 'PMC Italics',
				author : 'PMC',
				authorurl : 'http://pmc.com',
				infourl : '',
				version : "1.0"
			};
        },

		_createCommands : function( ed, url ) {
			ed.addCommand( 'pmc-italics', function() {
                var selected_text = ed.selection.getContent();

                if ( selected_text.length <= 1 )
                	return;

                if ( selected_text.match(/<em>.*<\/em>/) ) {
                	var new_text = selected_text.replace(/<em>(.*)<\/em>/, '$1' );
                	var pattern = new RegExp( selected_text, 'ig' );

	                var content = ed.getContent();
	              	ed.setContent( content.replace(
					    pattern,
					    new_text
					) );
                } else {
	                var pattern = new RegExp( '(<em>)?(\\b' + selected_text + '\\b)(</em>)?', 'ig' );

	                var content = ed.getContent();

	              	ed.setContent( content.replace(
					    pattern,
					    function( $0, $1, $2, $3 ) {
					        if ( $1 ) {
					            return $2;
					        } else {
					            match = true;
					            return '<em>' + $0 + '</em>';
					        }
					    }
					) );
				}
			} );
		},

		_createButtons : function( ed, url ) {
			ed.addButton( 'pmc-italics', {
                title : 'pmc-italics',
                cmd : 'pmc-italics',
            } );
		}
    }

    tinymce.create( 'tinymce.plugins.pmcItalics', pmcItalics );
    tinymce.PluginManager.add( 'pmcItalics', tinymce.plugins.pmcItalics );

} )();