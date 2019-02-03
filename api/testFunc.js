module.exports =
{
    f1: function() { console.log("Call me from a string!"); },
    f2: function(str1) { this[str1](); }
}