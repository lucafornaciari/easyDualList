# easyDualList
EasyDualList is a dual list box designed for JQuery. This plugin is easy for users to understand and use. Your dual list box will be ready in only two minutes.

## Installation
Copy the easyDualList.js or easyDualList.min.js file to a directory in your project and reference it via Javascript. After which it should be available as a jQuery plugin.

## Configuration
<b>leftContainer</b> : left container id. Example '#leftContainerID'<br>
<b>rightContainer</b> : right container id<br>
<b>btnToRight</b> : 'move to right' button id<br>
<b>btnToLeft</b> : 'move to left' button id<br>
<b>searchLeftContainer</b> : search input id of left container.
<b>searchRightContainer</b> : search input id of right container.<br>

## API
You can call easyDualList API easily:
```javascript
<script>
    var dualList = dualList();
    dualList.api_name();
</script>
```
| API   | Description |
| ----- | ----------- |
| getSelectedOptionsLeftContainer() | returns an array with selected options(value and text) in left container |
| getSelectedOptionsRightContainer() | returns an array with selected options (value and text) in right container |
| getOptionsLeftContainer() | returns an array with current options (value and text) in left container |
| getOptionsRightContainer() | returns an array with current options (value and text) in right container |
| moveToLeft() | moves selected options from right container to left container |
| moveToRight() | moves selected options from left container to right container |
| reset() | come back to initial situation |

## Usage
I use Bootrap to improve the rendering but it's not necessary.

Add the JavaScript to the end of your document:

```
<script src="jquery-1.11.3.js"></script>
<script src="bootstrap.min.js"></script>
<script src="dualListLibrary.min.js"></script>
```
This is the default configuration (you can see dualListLibrary.js)

```javascript
<script>
    var dualList = dualList();
</script>
```
but you can set elements with them id selector :

```javascript
<script>
    var dualList = dualList({
      leftContainer : '#selectLeftContainer',
      rightContainer : '#selectRightContainer',
      btnToRight : '#btnToRight',
      btnToLeft : '#btnToLeft',
      searchLeftContainer : '#sLContainer',
      searchRightContainer : '#sRContainer',
    });
</script>
```
Html is composed by two containers and two buttons:
Each element is identified by id value.

```html
    <div class="container">
       <div class="col-5">
            <h4>Pacco</h4>
            <div class="input-group"> <span class="input-group-addon">Cerca</span>
                <input id="sLContainer" type="text" class="form-control">
            </div>   
            <select class="unselected form-control" id="selectLeftContainer" style="height: 200px; width: 100%;" multiple="multiple">
                <option value="1L">1L</option>
                <option value="2L">2L</option>
                <option value="3L">3L</option>
            </select>
       </div> 
       <div class="col-2">
            <button type="button" id="btnToRight" class="btn btn-default col-8 col-offset-2"><span>TO RIGHT</button>
            <button type="button" id="btnToLeft" class="btn btn-default col-8 col-offset-2"><span>TO LEFT</span></button>
       </div>
       <div class="col-5">
        <h4>Lotto</h4>
        <div class="input-group"> <span class="input-group-addon">Cerca</span>
            <input id="sRContainer" type="text" class="form-control">
        </div>   
        <select class="unselected form-control" id="selectRightContainer" style="height: 200px; width: 100%;" multiple="multiple" >
            <option value="1R">1R</option>
            <option value="2R">2R</option>
            <option value="3R">3R</option>
        </select> 
       </div>
    </div>
```

## Tested compatibility
Current plugin is conformed with:

* IE9+
* Firefox (latest) 
* Chrome (latest)

Other browser should be work when they are compatible with JQuery. 