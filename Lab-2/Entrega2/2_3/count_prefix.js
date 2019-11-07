count = function () {
  return db.phones.aggregate([{$group: {"_id": "$components.prefix", "number": {$sum: 1}}}])
}