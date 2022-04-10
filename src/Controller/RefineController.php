<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RefineController extends AbstractController
{
    #[Route('/refine', name: 'refine')]
    #[Route('/refine/{resource}', name: 'refine_res')]
    #[Route('/refine/{resource}/{action}', name: 'refine_res_action')]
    #[Route('/refine/{resource}/{action}/{id}', name: 'refine_res_action_id')]
    public function index(): Response
    {
        return $this->render('refine/index.html.twig');
    }
}
