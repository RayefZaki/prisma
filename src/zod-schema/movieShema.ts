import {z,TypeOf} from 'zod'

export const addMovieSchema = z.object({
    body:z.object({


        name: 
        z.string({required_error:"Name is required!"})
        .min(3,"Name must be at least 3 characters"),

        genre:
        z.enum(["Drama","Action","Comedy"],{
            required_error:"genre is required and must be one of this array [`Drama`, `Action`, `Comedy`]",
        }),

        rating:
        z.number({required_error:"rating is required!"})
        .min(1,"must be less than 1")
        .max(5,"must be more than 5"),
         
        duration:
        z.number({required_error:"duration is required!"})
        .min(60,"must be less than 60"),

        createdate:
        z.date({required_error:"date is required!"}).min(new Date("1990-01-01"),{message:"movie is older than 1990"})
        .max(new Date(),{message:"movie is newer than 1990"}),
}),
})

export const updateMovieSchema = z.object({
    params:z.object({


        name: 
        z.string({required_error:"Name is required!"})
        .min(3,"Name must be at least 3 characters"),

        genre:
        z.enum(["Drama","Action","Comedy"],{
            required_error:"genre is required and must be one of this array [`Drama`, `Action`, `Comedy`]",
        }),

        rating:
        z.number({required_error:"rating is required!"})
        .min(1,"must be less than 1")
        .max(5,"must be more than 5"),
         
        duration:
        z.number({required_error:"duration is required!"})
        .min(60,"must be less than 60"),

        createdate:
        z.date({required_error:"date is required!"}).min(new Date("1990-01-01"),{message:"movie is older than 1990"})
        .max(new Date(),{message:"movie is newer than 1990"}),

        // prams:z.object({
        //     id:z.string({required_error:"Please send Id in prams!"}),
        // })
}),
})

export const deleteMovieSchema = z.object({
    params :z.object({
        id:z.string({required_error:"Please send Id in prams!"}),
    })
})

export const getMovieSchema = z.object({
    query:z.object({
        id:z.string({required_error:"Id is required"}),
    }),
})

export type movieSchemaType = TypeOf <typeof updateMovieSchema>['params'];

export type getMovieSchematype = z.infer<typeof getMovieSchema>['query'];
