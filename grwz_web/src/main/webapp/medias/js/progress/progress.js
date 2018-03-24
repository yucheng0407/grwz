/**
 * Created by yucheng on 2018/3/24.
 */
var Progress = {
    add: function (id, style, callBack) {
        var html = '<div id="bar"> ' +
            '<div id="progress"><div id="progress-value" class="progress-value">0%</div></div></div>';
        $(id).html(html);
        $("#bar").on("click", Progress._onclickProgress);
        Progress.callBack = callBack;
    },
    /**
     * 单击百分比加载进度条
     * @param e
     * @returns {*}
     */
    _onclickProgress: function (e) {
        var per = (e.offsetX / this.clientWidth);//百分比
        Progress.load(per);
        Progress.callBack(per);
    },
    /**
     * 百分比加载进度条
     * @param e
     * @returns {*}
     */
    load: function (per) {
        per = (per * 100).toFixed(1);
        if (per >= 100) {
            per = 100;
        }
        document.getElementById("progress").style.width = per + "%";
        document.getElementById("progress-value").innerText = per + "%";
    }
};

