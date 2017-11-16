Array.prototype.Min = function () {
    var minValue = this[0];
    this.forEach(function (item) {
        if (item.Compare(minValue) == -1) {
            minValue = item;
        }
    });
    return minValue;
}
Array.prototype.Max = function (selector) {
    var maxValue = this[0];
    this.forEach(function (item) {
        if (item.Compare(maxValue, selector) == 1) {
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
        if (b.hasOwnProperty(group))
            result.push(selector(b[group]));
    }
    return result;
}