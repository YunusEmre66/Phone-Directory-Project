import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import cors = require("cors")  //! bir kere yüklüyoruz bir daha aklımıza gelmiyor..
import { User } from "./entity/User"

const PORT= 3000

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())  //! body-parser : gelen isteklerin body kısmını okumak için kullanılır.
    app.use(express.static('public'))  //! express.static : public klasöründeki dosyaları sunucuya açmak için kullanılır.
    app.use(cors({credentials:true}))  //!cors : farklı domainlerden gelen istekleri kabul etmek için kullanılır.
    
    // register express routes from defined application routes
    Routes.forEach(route => {  //! Routes : tanımlanan tüm route'ları döner. ve her bir route için aşağıdaki işlemleri yapar. burası kalıp bir yapıdır.
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) { 
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(PORT)

      // insert new users for test

    console.log(PORT , ":::::ÇALIŞIYOR.....http://localhost:3000")

}).catch(error => console.log(error))
