package com.mynewapp

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import android.util.Log

class FragmentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  init {
    Log.d("FragmentModule", "FragmentModule loaded successfully")
  }

  override fun getName(): String {
    return "FragmentModule"
  }

  @ReactMethod
  fun showCustomFragment(videoId: String, accessToken: String) {
    Log.e("FragmentModule", "showCustomFragment() called")
    // Ensure the currentActivity is a FragmentActivity
    val activity = currentActivity as? FragmentActivity
    activity?.let {
      // Begin the fragment transaction
      val fragmentTransaction = it.supportFragmentManager.beginTransaction()

      // Create a new fragment instance
      val bundle = Bundle()
      bundle.putString("VIDEO_ID", videoId)
      bundle.putString("ACCESS_TOKEN", accessToken)
      val fragment = PlayerFragment()
      fragment.setArguments(bundle)

      // Find a container to add the fragment
      val fragmentContainerId = android.R.id.content // or you could specify your own container ID

      // Add the fragment
      fragmentTransaction.replace(fragmentContainerId, fragment)
      fragmentTransaction.addToBackStack(null)  // Optional: Add fragment to back stack
      fragmentTransaction.commit()
    } ?: run {
      // Handle the error if the activity is not a FragmentActivity
      Log.e("FragmentModule", "Current activity is not a FragmentActivity")
    }
  }
}
