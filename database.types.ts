export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercise: {
        Row: {
          deleted: boolean
          exerciseid: string
          name: string
          numberofsets: number
          units: boolean
          userid: string
        }
        Insert: {
          deleted?: boolean
          exerciseid?: string
          name: string
          numberofsets?: number
          units?: boolean
          userid: string
        }
        Update: {
          deleted?: boolean
          exerciseid?: string
          name?: string
          numberofsets?: number
          units?: boolean
          userid?: string
        }
        Relationships: []
      }
      sets: {
        Row: {
          exerciseid: string | null
          exercisename: string | null
          reps: number
          setid: string
          units: boolean
          weight: number
        }
        Insert: {
          exerciseid?: string | null
          exercisename?: string | null
          reps?: number
          setid?: string
          units?: boolean
          weight?: number
        }
        Update: {
          exerciseid?: string | null
          exercisename?: string | null
          reps?: number
          setid?: string
          units?: boolean
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "sets_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exerciseid"]
          },
          {
            foreignKeyName: "sets_exercisename_fkey"
            columns: ["exercisename"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["name"]
          },
        ]
      }
      template: {
        Row: {
          frequency: number
          name: string
          templateid: string
          userid: string
        }
        Insert: {
          frequency: number
          name: string
          templateid?: string
          userid: string
        }
        Update: {
          frequency?: number
          name?: string
          templateid?: string
          userid?: string
        }
        Relationships: []
      }
      workout: {
        Row: {
          exerciseid: string
          templateid: string
          userid: string
        }
        Insert: {
          exerciseid: string
          templateid: string
          userid: string
        }
        Update: {
          exerciseid?: string
          templateid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exerciseid"]
          },
          {
            foreignKeyName: "workout_templateid_fkey"
            columns: ["templateid"]
            isOneToOne: false
            referencedRelation: "template"
            referencedColumns: ["templateid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_template: {
        Args:
          | {
              input_userid: string
              record: Database["public"]["Tables"]["exercise"]["Row"][]
              input_templatename: string
              input_frequency: number
            }
          | {
              input_userid: string
              input_templatename: string
              input_frequency: number
            }
          | {
              input_userid: string
              input_exerciseid: string
              input_exercisename: string
              input_numberofsets: number
              input_units: boolean
              input_deleted: boolean
              input_templatename: string
              input_frequency: number
            }
          | {
              input_userid: string
              exercises_r: Database["public"]["CompositeTypes"]["exercise_record"][]
              input_templatename: string
              input_frequency: number
            }
        Returns: undefined
      }
      get_todays_template: {
        Args: { input_userid: string; input_frequency: number }
        Returns: {
          frequency: number
          name: string
          templateid: string
          userid: string
        }[]
      }
      get_workout: {
        Args:
          | { input_tempalteid: string; input_userid: string }
          | { input_templateid: string }
        Returns: {
          deleted: boolean
          exerciseid: string
          name: string
          numberofsets: number
          units: boolean
          userid: string
        }[]
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      test: {
        Args: { pipi: number } | Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      exercise_record: {
        exerciseid: string | null
        exercisename: string | null
        numberofsets: number | null
        units: boolean | null
        deleted: boolean | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
