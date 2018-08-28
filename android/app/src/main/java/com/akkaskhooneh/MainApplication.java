package com.akkaskhooneh;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.wix.RNCameraKit.RNCameraKitPackage;
import org.reactnative.camera.RNCameraPackage;
=======
>>>>>>> f8d1b8b5afdca9c9f75f3d4a50ae2729d1834c72
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new RNCameraKitPackage(),
            new RNCameraPackage(),
=======
>>>>>>> f8d1b8b5afdca9c9f75f3d4a50ae2729d1834c72
            new PickerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
