package com.freecharge.printer

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothSocket
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.OutputStream
import java.util.UUID
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

class MPTPrinterModule(
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  private val PRINTER_UUID: UUID =
    UUID.fromString("00001101-0000-1000-8000-00805F9B34FB")

  override fun getName(): String = "MPTPrinter"

  @ReactMethod
  fun print(macAddress: String, text: String, promise: Promise) {
    try {
      val adapter = BluetoothAdapter.getDefaultAdapter()
      if (adapter == null) {
        promise.reject("BT_ERROR", "Bluetooth not supported")
        return
      }

      val device: BluetoothDevice = adapter.getRemoteDevice(macAddress)
      val socket: BluetoothSocket =
        device.createRfcommSocketToServiceRecord(PRINTER_UUID)

      // socket.connect()
      // val output: OutputStream = socket.outputStream

      socket.connect()

      Thread.sleep(500) // 🔑 CRITICAL (300–700ms works)

      val output = socket.outputStream


      // Initialize printer
      output.write(byteArrayOf(0x1B, 0x40))

      output.write(text.toByteArray(Charsets.US_ASCII))

      // Feed & cut
      output.write(byteArrayOf(0x0A, 0x0A, 0x0A))
      // output.write(byteArrayOf(0x1D, 0x56, 0x41, 0x10))

      output.flush()
      socket.close()

      promise.resolve("PRINT_SUCCESS")
    } catch (e: Exception) {
      promise.reject("PRINT_ERROR", e.message)
    }
  }


  @ReactMethod
fun getPairedDevices(promise: Promise) {
  try {
    val adapter = BluetoothAdapter.getDefaultAdapter()
    if (adapter == null) {
      promise.reject("BT_ERROR", "Bluetooth not supported")
      return
    }

    val array: WritableArray = Arguments.createArray()

    for (device in adapter.bondedDevices) {
      val map: WritableMap = Arguments.createMap()
      map.putString("name", device.name)
      map.putString("mac", device.address)
      array.pushMap(map)
    }

    promise.resolve(array)
  } catch (e: Exception) {
    promise.reject("BT_ERROR", e.message)
  }
}



@ReactMethod
fun isBluetoothEnabled(promise: Promise) {
  val adapter = BluetoothAdapter.getDefaultAdapter()
  promise.resolve(adapter != null && adapter.isEnabled)
}


@ReactMethod
fun testConnection(macAddress: String, promise: Promise) {
  try {
    val adapter = BluetoothAdapter.getDefaultAdapter()
    val device = adapter.getRemoteDevice(macAddress)
    val socket = device.createRfcommSocketToServiceRecord(PRINTER_UUID)

    socket.connect()
    socket.close()

    promise.resolve(true)
  } catch (e: Exception) {
    promise.resolve(false)
  }
}

}
