Array.prototype.Min = function () {
    var minValue = this[0];
    this.forEach(function (item) {
        if (item.Compare(minValue) == -1) {
            minValue = item;
        }
    });
    return minValue;
}
Array.prototype.Max = function () {
    var maxValue = this[0];
    this.forEach(function (item) {
        if (item.Compare(maxValue) == 1) {
            maxValue = item;
        }
    });
    return maxValue;
}
Object.prototype.getter = function (target, name, callback) {
    Object.defineProperty(target, name, {
        get: callback
    });
}
Array.prototype.Group = function (predicate, selector) {
    var b = {};
    this.forEach(function (item) {
        var group = predicate(item);
        b[group] == null ? (b[group] = [item]) : b[group].push(item);

    });
    var result = [];
    for (var group in b) {
        result.push(selector(b[group]));
    }
    return result;
}