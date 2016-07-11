/**
 * Created by zhushihao on 2016/7/5.
 */
import React,{Component} from 'react'
import '../../stylesheets/partials/modules/VoiceWave.scss'

export default class VoiceWave extends Component {
  render(){
    return(
      <div className="voice-waves">
        {
          [1,2,3].map(index =>
            <span className={`voice-wave voice-wave-${index}`} /> 
          )
        }
      </div>
    )
  }
}