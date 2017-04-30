/**
 *  v1.0.0
 *  ookooer
 *
 *  公共辅助模块
 */

var GLOBAL_HELPER = (function() {
    /**
    *  get parameter form url that between '?' and '&'
    *
    *  @param {string} url_parameter    parameter string
    *  @param {string} paramName        parameter name for search
    *
    *  @return {string}             if not find return "", else return parameter value
    */
    var getParamFromURL = function(url_parameter, paramName)  {
        paramValue = "";
        isFound = false;
        if(url_parameter.indexOf("?") == 0 && url_parameter.indexOf("=") > 1) {
            arrSource = unescape(url_parameter).substring(1, url_parameter.length).split("&");
            i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    }

    /**
    *  check whether the string is empty
    *
    *  @param {string} sz          string need check
    *
    *  @return  { boolean }   if string is empty return true
    */
    var stringIsEmpty = function(sz)    {
        return sz !== null && sz !== undefined && sz !== '';
    }

    return {
        getParamFromURL : getParamFromURL,
        stringIsEmpty   : stringIsEmpty   
    };
})();


