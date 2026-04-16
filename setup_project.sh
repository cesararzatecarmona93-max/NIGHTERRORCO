#!/bin/bash

# setup_project.sh
# Script to create the Android project structure and inject base code.

echo "Creating Android project structure..."

# Create directories
mkdir -p app/src/main/java/com/cesar/arzate/llamadroid/
mkdir -p app/src/main/cpp/
mkdir -p app/src/main/res/drawable/

# Inject MainActivity.kt
cat << 'EOF_INNER' > app/src/main/java/com/cesar/arzate/llamadroid/MainActivity.kt
package com.cesar.arzate.llamadroid

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.cesar.arzate.llamadroid.ui.theme.LlamadroidTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            LlamadroidTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Cesar Arzate Carmona")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    LlamadroidTheme {
        Greeting("Android")
    }
}
EOF_INNER

# Inject CMakeLists.txt
cat << 'EOF_INNER' > app/src/main/cpp/CMakeLists.txt
# CMakeLists.txt for Edge Processing / Fixed-point math / Strict memory optimization

cmake_minimum_required(VERSION 3.22.1)

project("llamadroid")

add_library(
        llamadroid
        SHARED
        native-lib.cpp)

find_library(
        log-lib
        log)

target_link_libraries(
        llamadroid
        ${log-lib})
EOF_INNER

# Inject native-lib.cpp just to have something valid
cat << 'EOF_INNER' > app/src/main/cpp/native-lib.cpp
#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_cesar_arzate_llamadroid_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
EOF_INNER

echo "Project structure and base files generated successfully."
echo "¡Éxito total, Cesar Arzate Carmona! Proyecto Android configurado."
