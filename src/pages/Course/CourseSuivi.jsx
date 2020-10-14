import React, { useEffect } from 'react';
import { Switch, Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {StartCoursePage} from "./StartCourse";
import {ListeCoursePage} from "./ListeCourse";

import "./Course.css";

function CourseSuiviRouter() {

    let { path, url } = useRouteMatch();

    return (
        <div id="dashboard-courses-above-recommended-courses">
        
        <section id="courses-taken">
        <h1 class="secondTitle">
        Cours suivis
        </h1>
        <table class="table table-hover" >
        <thead>
        <tr class="dashboardTable__header">
        <th class="text-left">
        Cours
        </th>
        <th class="dashboardTable__infoSecondary">
        Date d'inscription au cours
        </th>
        <th class="dashboardTable__headProgress">
        Progression
        </th>
        <th class="dashboardTable__infoSecondary">
        Certificats
        </th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td class="text-left">
        <a href="#" class="dashboardTable__link">
        Installer Python
        </a>
        </td>
        <td class="text-left">
        <a href="#" class="dashboardTable__link">
        25/06/2019
        </a>
        </td>
        <td class="text-left">
        <a href="#" class="dashboardTable__link">
        <div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="progressBar"></div>
</div>
        </a>
        </td>
        <td class="text-left">
        <a href="#" class="dashboardTable__link">
        
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </section>
        </div>
    );
}

export { CourseSuiviRouter };