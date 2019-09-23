//
//  YandexPayment.m
//  MyFramework
//
//  Created by Антон Власов on 04/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

#import "MyFramework-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(NativeLibrary, RCTViewManager)

RCT_EXTERN_METHOD(getValue: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

@end
