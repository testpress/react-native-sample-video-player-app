package com.mynewapp

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.tpstream.player.TPStreamPlayerListener
import com.tpstream.player.TpInitParams
import com.tpstream.player.TpStreamPlayer
import com.tpstream.player.ui.InitializationListener
import com.tpstream.player.ui.TPStreamPlayerView
import com.tpstream.player.ui.TpStreamPlayerFragment

class PlayerFragment : Fragment() {

  lateinit var player: TpStreamPlayer
  lateinit var playerView: TPStreamPlayerView
  lateinit var playerFragment: TpStreamPlayerFragment
  private var videoId :String = ""
  private var accessToken :String = ""

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val bundle = arguments
    if (bundle != null) {
      videoId = bundle.getString("VIDEO_ID") ?: ""
      accessToken = bundle.getString("ACCESS_TOKEN") ?: ""
    }
  }

  override fun onCreateView(
    inflater: LayoutInflater, container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    return inflater.inflate(R.layout.fragment_player, container, false)
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    playerFragment = childFragmentManager.findFragmentById(R.id.tpstream_player_fragment) as TpStreamPlayerFragment
    playerFragment.setOnInitializationListener(object: InitializationListener {

      override fun onInitializationSuccess(player: TpStreamPlayer) {
        this@PlayerFragment.player = player
        playerView = playerFragment.tpStreamPlayerView
        loadPLayer()
        addPlayerListener()
      }
    })
  }

  fun loadPLayer() {
    val parameters = TpInitParams.Builder()
      .setVideoId(videoId)
      .setAccessToken(accessToken)
      .enableDownloadSupport(true)
      .setAutoPlay(true)
      .build()
    player.load(parameters)
  }

  private fun addPlayerListener(){
    player.setListener( object : TPStreamPlayerListener {
      override fun onPlaybackStateChanged(playbackState: Int) {
        Log.d("TAG", "onPlaybackStateChanged: $playbackState")
      }

      override fun onAccessTokenExpired(videoId: String, callback: (String) -> Unit) {
        callback(accessToken)
      }

      override fun onMarkerCallback(timesInSeconds: Long) {
        Toast.makeText(requireContext(),"Time $timesInSeconds", Toast.LENGTH_SHORT).show()
      }
    })
  }

  override fun onResume() {
    super.onResume()
    Log.d("ReactNativeJS", "onResume: ")
  }

  override fun onDestroy() {
    super.onDestroy()
    Log.d("ReactNativeJS", "onDestroy: ")
  }

}
