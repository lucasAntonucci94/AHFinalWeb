import React from "react"
import { Link } from "react-router-dom"

function PageNotFound({}){

    return (
        <main className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-10 text-center my-4">
              <h1>No se encontro la página a la que desea acceder.</h1>
            </div>
            <div className="col-10 text-center mt-3">
              <Link className="btn btn-warning" to="/">Volver al inicio</Link>
            </div>
          </div>
        </main>
    )
}

export default PageNotFound