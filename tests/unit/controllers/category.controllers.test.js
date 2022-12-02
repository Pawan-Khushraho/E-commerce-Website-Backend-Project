const categoryController = require("../../../controllers/category.controller")
const model = require("../../../models")
const categoryModel = model.category;
const newCategory = require("../../mock-data/new-data.json");
const {mockRequest,mockResponse}=require("../interceptor");



let req,res;

beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})

describe('categoryController.create', () => { 
    beforeEach(()=>{
        req.body = newCategory
    })

    test('should call category.Create  and create a new category', async () => { 
            //mock model command
            const spy = jest.spyOn(categoryModel,'create')
            .mockImplementation((newCategory)=>Promise.resolve(newCategory)) 
            
            await categoryController.create(req,res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(newCategory)
            expect(categoryModel.create).toHaveBeenCalledWith(newCategory)

     })

    test('should call category.Create and ends with and error', async () => { 
        //mock model command
        const spy = jest.spyOn(categoryModel,'create')
        .mockImplementation(()=>Promise.reject(Error("This is an error"))) 

        await categoryController.create(req,res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something Went Wrong while creating category")
        expect(categoryModel.create).toHaveBeenCalledWith(newCategory);

     })
 })