var secondsPerPixel = 60;
var Graph = function (canvas, data) {
    this.canvas = canvas;
    this.data = data;
}
Graph.prototype.draw = function () {
    this.min = this.data.getMinDate();
    this.max = this.data.getMaxDate();
    this.canvas.draw(this.data.Groups());
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
Canvas.prototype.draw = function (serieses) {
    var index = 0;
    serieses.forEach(function (series) {
        this.drawSeries(series, index++);
    }, this);
};
Canvas.prototype.drawSeries = function (series, index) {
    this.drawBar(10, 40 * index, 300, 30, "#c53344");
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
    return this.data.Max();
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
    this.Compare = function (event) {
        return this.start.Compare(event.start);
    }
}
var Series = function (events) {
    this.events = events;
}

var On = function (year, month, day, hour, minute, second, millisecond) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour || 00;
    this.minute = minute || 00;
    this.second = second || 00;
    this.millisecond = 00;
    this.date = new Date(year, month, day, hour, minute, second, millisecond);
}
// Less = -1, Greater = 1;
On.prototype.Compare = function (on) {
    return this.date == on.date ? 0 : this.date < on.date ? -1 : 1;
}