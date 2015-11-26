;(function(global,$){
    
    /***************DEFAULT CONFIGURATION******************
    var option={
        leftContainer : '#leftContainer',
        rightContainer : '#rightContainer',
        btnToRight : '#move-right',
        btnToLeft : '#move-left',
        searchLeftContainer : '#searchLeftContainer',
        searchRightContainer : '#searchRightContainer'
    }
    
    ******************************************************/
    
    // 'new' an object
    var DualListContainer = function(options){
        var config= options || {};
        return new DualListContainer.init(config);
    }
    
    // Array with initial situation in Containers
    var initialOptionsLeftContainer=[];
    var initialOptionsRightContainer=[];
    
    // Current options in containers. 
    // Array structure: [{value: 'x', text: 'hello'},{value: 'y', text: 'bye'}]
    var optionsLeftContainer=[];
    var optionsRightContainer=[];
    
    
    // addListeners is called when easyDualList instantiated.
    // adds listener to the search input and containers
    function addListeners(component){
        
        // Listeners of Search input
        $(component.searchLeftContainer).keyup(function () {
                var options = optionsLeftContainer;
                $(component.leftContainer).empty();
                var rex = new RegExp($(this).val(), 'gi'); 
                $.each(options, function(i) {
                    var option = options[i];
                    if(option.text.match(rex) !== null) {
                        $(component.leftContainer).append(
                            $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
        });
        
        $(component.searchRightContainer).keyup(function () {
                var options = optionsRightContainer;
                $(component.rightContainer).empty();
                var rex = new RegExp($(this).val(), 'gi'); 
                $.each(options, function(i) {
                    var option = options[i];
                    if(option.text.match(rex) !== null) {
                        $(component.rightContainer).append(
                            $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
        });
        
        //Listener CLICK btnToRight
        $(component.btnToRight).click(function(){
           component.moveToRight(); 
        });
        
        //Listener CLICK btnToLeft
        $(component.btnToLeft).click(function(){
           component.moveToLeft(); 
        });
        
        // Listener CLICK right container
        $(component.leftContainer).click(function(){
            
           $(component.rightContainer+" option").removeAttr("selected"); 
           $(component.btnToRight).removeAttr('disabled');     
           $(component.btnToLeft).attr('disabled','disabled'); 
        });
        
        // Listener CLICK left container
        $(component.rightContainer).click(function(){
           $(component.leftContainer+" option").removeAttr("selected"); 
           $(component.btnToLeft).removeAttr('disabled');           
           $(component.btnToRight).attr('disabled','disabled'); 
        });
        
    }
    
    // API easyDualList
    DualListContainer.prototype={
        // return the current selected voices in left container
        getSelectedOptionsLeftContainer: function(){
            var optionsSelectedLeft=[];
            $(this.leftContainer+" option:selected" ).each(function() {
              optionsSelectedLeft.push({value: $(this).val(), text: $(this).text()});
            });
            return optionsSelectedLeft;
        },
        
        // return the current selected voices in right container
        getSelectedOptionsRightContainer: function(){
            var optionsSelectedRight=[];
            $(this.rightContainer+" option:selected" ).each(function() {
              optionsSelectedRight.push({value: $(this).val(), text: $(this).text()});
            });
            return optionsSelectedRight;
        },
        
        //sets the optionsLeftContainer array  with the current options in left container
        setOptionsLeftContainer: function(){
            optionsLeftContainer=this.getOptionsLeftContainer();
        },
        
        //return array with current options in left container.
        getOptionsLeftContainer: function(){
            if(!$){
                throw 'Jquery not loaded';
            }
            var optionsLeftContainer=[];
            $(this.leftContainer).find('option').each(function() {
                //push elements in array
                optionsLeftContainer.push({value: $(this).val(), text: $(this).text()});
            });
            return optionsLeftContainer;
        },
        
        //sets the optionsRightContainer array  with the current options in left container
        setOptionsRightContainer: function(){
            optionsRightContainer=this.getOptionsRightContainer();
        },
        
        //return array with current options in right container.
        getOptionsRightContainer: function(){
            if(!$){
                throw 'Jquery not loaded';
            }
            var optionsRightContainer=[];
            $(this.rightContainer).find('option').each(function() {
                //push elements in array
                optionsRightContainer.push({value: $(this).val(), text: $(this).text()});
            });
            return optionsRightContainer;
        },
        
        setOptionsContainers: function(){
            this.setOptionsLeftContainer();
            this.setOptionsRightContainer();
        },
        
        setInitialOptionsContainers: function(){
            this.setOptionsContainers();
            initialOptionsLeftContainer=this.getOptionsLeftContainer();
            initialOptionsRightContainer=this.getOptionsRightContainer();
        },
        
        //moveToLeft move selected voices from right container to left container
        moveToLeft:function(){
            if(!$){
                throw 'Jquery not loaded';
            }
            var selectedOptions=[];
            //get selected options in right container
            selectedOptions = this.getSelectedOptionsRightContainer();
            //delete selected options in right container
            this.removeOptionsToContainer('right'); 
            //append selected options in left container
            this.addOptionsToContainer(selectedOptions,'left');//mi aggiungi le voci selezionate nel contenitore di sinistra
            //set array with the new situation
            this.setOptionsContainers();
        },  
        
        //moveToRight move selected voices from left container to right container
        moveToRight: function(){
            if(!$){
                throw 'Jquery not loaded';
            }
            var selectedOptions=[];
            //get selected options in left container
            selectedOptions = this.getSelectedOptionsLeftContainer();
            //delete selected options in left container
            this.removeOptionsToContainer('left'); 
            //append selected options in right container
            this.addOptionsToContainer(selectedOptions,'right');
            //set array with the new situation
            this.setOptionsContainers();
        },
        
        //adds new options to the container
        addOptionsToContainer: function(data,type){
            var selector;
            (type=='left' ? selector=this.leftContainer : selector=this.rightContainer);
            $.each(data, function(key,item) {  
                 $(selector).append("<option value='"+item.value+"'>"+item.text+"</option>");
            });
        },
        
        //remove selected options to the container
        removeOptionsToContainer: function(type){
            var selector;
            (type=='left' ? selector=this.leftContainer : selector=this.rightContainer);
            $(selector+" option:selected").each(function(){
               this.remove(); 
            });
        },
        
        //empty left container
        emptyLeftContainer: function(){
            $(this.leftContainer+" option").remove();
            this.setOptionsLeftContainer();
        },
        
        //empty right container
        emptyRightContainer: function(){
            $(this.rightContainer+" option").remove();
            this.setOptionsRightContainer();
        },
        
        //empty all containers
        emptyContainers: function(){
            this.emptyLeftContainer();
            this.emptyRightContainer();
        },
        
        //return to the initial situation
        reset: function(){
            this.emptyContainers();
            var leftSelector=this.leftContainer;
            var rightSelector=this.rightContainer;
            //Append initial voices 
            $.each(initialOptionsLeftContainer, function(key,item) {  
                 $(leftSelector).append("<option value='"+item.value+"'>"+item.text+"</option>");
            });
            $.each(initialOptionsRightContainer, function(key,item) {  
                 $(rightSelector).append("<option value='"+item.value+"'>"+item.text+"</option>");
            }); 
            this.setOptionsContainers();
        }
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    DualListContainer.init = function(config){
        var self = this;
        self.leftContainer = config.leftContainer || '#leftContainer';
        self.rightContainer= config.rightContainer || '#rightContainer';
        self.btnToRight = config.btnToRight || '#move-right';
        self.btnToLeft = config.btnToLeft || '#move-left';
        self.searchLeftContainer = config.searchLeftContainer || '#searchLeftContainer';
        self.searchRightContainer = config.searchRightContainer || '#searchRightContainer';
        
        //set array with the current container options 
        self.setInitialOptionsContainers();
        //create listeners
        addListeners(self);
    };
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    DualListContainer.init.prototype = DualListContainer.prototype;
    // attach our DualListContainer to the global object, and provide a shorthand 'dualList' for ease our poor fingers
    global.DualListContainer = global.dualList = DualListContainer; 
    
})(window,jQuery);