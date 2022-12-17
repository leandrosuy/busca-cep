import { Request, Response, Router } from 'express';
import cep from 'cep-promise';
const routes = Router();

routes.get(
  '/consulta-cep/:cepParams',
  (request: Request, response: Response) => {
    const cepParams = request.params;

    if (cepParams.cepParams.length < 8) {
      response.status(500).json({
        error: 'O CEP precisa ter 8 cacteres!',
      });
      return;
    }

    cep(`${cepParams.cepParams}`)
      .then(res => {
        response.status(200).json({
          cep: res.cep,
          estado: res.state,
          cidade: res.city,
          bairro: res.neighborhood,
          rua: res.street,
        });
      })
      .catch(error => {
        response.status(406).json({
          error: error.message,
        });
      });
  },
);

export default routes;
