class APIFeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    };

    // 1 ) Filtering
    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        // 2) Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

     // 3 ) Sorting 
    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    // 4) Field Limiting
    limitFields(){
    if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);  // select işlemi burada yapılır
    } else {
        this.query = this.query.select('name duration price ratingsAverage createdAt');  // Varsayılan alanları seç
    }
    return this;
    }

    // 5 ) Pagination
    paginate(){
    const page = this.queryString.page *1 || 1;
    const limit = this.queryString.limit * 1|| 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
    }
}

module.exports = APIFeatures;