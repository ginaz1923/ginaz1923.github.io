(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("0-1 json",
{ "compressionlevel":-1,
 "height":5,
 "infinite":false,
 "layers":[
        {
         "data":[1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28, 29, 30, 31, 32,
            33, 34, 35, 36, 37, 38, 39, 40],
         "height":5,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":8,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":2,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":120.781,
                 "id":2,
                 "name":"BlueBox",
                 "properties":[
                        {
                         "name":"Spawn Player Here",
                         "type":"string",
                         "value":""
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":190.009,
                 "x":26.5129,
                 "y":167.915
                }, 
                {
                 "height":122.254,
                 "id":3,
                 "name":"RedBox",
                 "properties":[
                        {
                         "name":"Spawn Enemies Here",
                         "type":"string",
                         "value":""
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":11.7835,
                 "x":1571.63,
                 "y":304.899
                }, 
                {
                 "height":169.333333333333,
                 "id":5,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":1389.33333333333,
                 "x":193.333333333333,
                 "y":-2.66666666666667
                }, 
                {
                 "height":288,
                 "id":6,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":1393.33333333333,
                 "x":190.666666666667,
                 "y":430.666666666667
                }, 
                {
                 "height":152,
                 "id":7,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":198.666666666667,
                 "x":792,
                 "y":285.333333333333
                }, 
                {
                 "height":165.333333333333,
                 "id":8,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":205.333333333333,
                 "x":396,
                 "y":144
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":3,
 "nextobjectid":9,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.1",
 "tileheight":144,
 "tilesets":[
        {
         "firstgid":1,
         "source":"0-1.tsx"
        }],
 "tilewidth":198,
 "type":"map",
 "version":"1.10",
 "width":8
});