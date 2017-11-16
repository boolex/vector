var secondsPerPixel = 1;
var Graph = function (canvas, data) {
    this.canvas = canvas;
    this.data = data;
}
Graph.prototype.draw = function () {
    this.min = this.data.getMinDate();
    this.max = this.data.getMaxDate();
    this.canvas.draw(this.min, this.max, this.data.Groups());
};
var Canvas = function (id) {
    this.id = id;
    Object.getter(this, "element", this.getElement);
    Object.getter(this, "context", this.getContext);
}
Canvas.prototype.getElement = function () {
    return this.__element == null ? (this.__element = document.getElementById(this.id)) : this.__element;
}
Canvas.prototype.getContext = function () {
    return this.__context == null ? (this.__context = this.element.getContext("2d")) : this.__context;
}
Canvas.prototype.draw = function (min, max, serieses) {
    this.drawBackground(min, max)
        .drawSerieses(serieses);
};
Canvas.prototype.drawBackground = function (min, max) {
    var seconds = new TimeSpan(min, max).getTotalSeconds();
    var width = seconds / secondsPerPixel;
    this.element.style.width = width + "px";
    console.log(this.element.style.width);
    return this;
}
Canvas.prototype.drawSerieses = function (serieses) {
    var index = 0;
    serieses.forEach(function (series) {
        this.drawSeries(series, index++);
    }, this);
    return this;
}
Canvas.prototype.drawSeries = function (series, index) {
    var canvas = this;
    series.forEach(function (e) {
        canvas.drawEvent(e, index)
    });
    return this;
}
Canvas.prototype.drawEvent = function (e, rowIndex) {
    this.drawBar(10, 40 * rowIndex, 300, 30, "#c53344");
}
Canvas.prototype.drawBar = function (upperLeftCornerX, upperLeftCornerY, width, height, color) {
    this.context.save();
    this.context.fillStyle = color;
    this.context.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    this.context.restore();
};

var DataCollection = function (data) {
    this.data = data;
}
DataCollection.prototype.getMinDate = function () {
    return this.data.Min();
};
DataCollection.prototype.getMaxDate = function () {
    return this.data.Max(function (x) { return x.end; });
};
DataCollection.prototype.Groups = function () {
    return this.data.Group(
        function (item) { return item.type; },
        function (eventGroup) { return new Series(eventGroup); }
    )
}
var Event = function (type, start, end, attributes) {
    this.type = type;
    this.start = start;
    this.end = end;
    this.attributes = attributes;
    this.Compare = function (event, selector) {
        var compareSelector = selector == null ? this.defaultSelector : selector;
        return compareSelector(this).Compare(compareSelector(event));
    }
}
Event.prototype.defaultSelector = function (target) {
    return (target || this).start;
}
var Series = function (events) {
    this.events = events;
}
Series.prototype.forEach = function (callback) {
    this.events.forEach(function (e) { callback(e); });
}
var On = function (year, month, day, hour, minute, second, millisecond) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour || 00;
    this.minute = minute || 00;
    this.second = second || 00;
    this.millisecond = 00;
    this.date = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);

}
var TimeSpan = function (a, b) {
    this.a = a;
    this.b = b;
}
TimeSpan.prototype.getTotalSeconds = function () {
    return this.getTotalMilliseconds() / 1000;
}
TimeSpan.prototype.getTotalMilliseconds = function () {
    var ms = this.a.start.date - this.b.end.date;
    if (ms < 0) {
        ms *= -1;
    }
    return ms;
}
// Less = -1, Greater = 1;
On.prototype.Compare = function (on) {
    return this.date == on.date ? 0 : this.date < on.date ? -1 : 1;
}