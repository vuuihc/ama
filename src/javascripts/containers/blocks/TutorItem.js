import React, {Component} from 'react';
import { Link } from 'react-router';
import { baseUrl } from '../../api/config';
import "../../../stylesheets/partials/modules/TutorItem.scss"

const TutorItem = ({
    tutor,
    index,
    userId
})=>{
    return(
        <Link key={index} to={tutor.user_id == userId ? `${baseUrl}account` : `${baseUrl}tutor/${tutor.user_id}` }>
          <article>
            <div className="tutor-info">
              <img src={tutor.user_face.slice(0, -1) + '132'}/>
              <div className="tutor-intro">
                <h3 >{tutor.user_name}</h3>
                <h4>
                  <span>{tutor.user_title}</span>
                </h4>
              </div>
            </div>
            <div className="answer-info">
              {tutor.answer_number}个回答
            </div>
          </article>
        </Link>
    )
}

export default TutorItem;
